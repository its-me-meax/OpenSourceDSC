'use strict';

// Properly declared variables
let galleryImages = [];
let currentCategory = 'all';

// Data hardcoded instead of fetched from an API
const galleryData = [
    { id: 1, src: "images/gallery/hackathon1.jpg", category: "hackathon", caption: "Annual Hackathon 2024" },
    { id: 2, src: "images/gallery/workshop1.jpg", category: "workshop", caption: "Python for Beginners" },
    { id: 3, src: "images/gallery/social1.jpg", category: "social", caption: "End of Year Party" },
    { id: 4, src: "images/gallery/hackathon2.jpg", category: "hackathon", caption: "Team Coding Session" },
    { id: 5, src: "images/gallery/workshop2.jpg", category: "workshop", caption: "Web Development Workshop" },
    { id: 6, src: "images/gallery/social2.jpg", category: "social", caption: "Tech Meetup" },
    { id: 7, src: "images/gallery/hackathon3.jpg", category: "hackathon", caption: "Hackathon Winners" },
    { id: 8, src: "images/gallery/workshop3.jpg", category: "workshop", caption: "Mobile App Development" },
    { id: 9, src: "images/gallery/social3.jpg", category: "social", caption: "Networking Event" },
    // Should have at least 12 images for a proper grid
];

// Initialize gallery on page load
window.onload = function() {
    loadGallery();
    setupLightbox();
    
    // Event listener for filter clicks
    const filters = document.querySelectorAll('.gallery-filters span');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update current category and reload gallery
            currentCategory = this.getAttribute('data-category');
            loadGallery();
        });
    });
    
    // Form submission handling - with issues
    const form = document.querySelector('.upload-section form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Just shows alert instead of actual upload logic
            alert('Photo upload functionality is not implemented yet.');
            // Doesn't validate form
            this.reset();
        });
    }
};

// Load gallery images based on current category
function loadGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Filter images based on category
    const filteredImages = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(img => img.category === currentCategory);
    
    // Check if there are images
    if (filteredImages.length === 0) {
        container.innerHTML = '<p class="empty-gallery">No images found in this category.</p>';
        return;
    }
    
    // Create image elements
    filteredImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.id = image.id;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption; // Added alt text
        
        // Error handling for image load failures
        img.onerror = () => {
            img.src = 'images/placeholder.png';
            img.alt = 'Image not available';
        };
        
        item.appendChild(img);
        
        // Add click event for lightbox
        item.addEventListener('click', () => {
            openLightbox(image);
        });
        
        container.appendChild(item);
    });
}

// Lightbox functionality - incomplete
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && caption) {
        lightboxImg.src = image.src;
        caption.textContent = image.caption;
        lightbox.style.display = 'block';
    }
    
    // Missing error handling
    lightboxImg.onerror = () => {
        lightboxImg.src = 'images/placeholder.png';
        caption.textContent = 'Image not available';
    };
    
    // Missing loading indicators
    lightboxImg.onload = () => {
        lightboxImg.style.display = 'block';
    };
    lightboxImg.style.display = 'none';
    
    // Missing navigation between images
    // Add navigation buttons and functionality
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    if (prevButton && nextButton) {
        prevButton.onclick = () => navigateLightbox(-1);
        nextButton.onclick = () => navigateLightbox(1);
    }
}

function navigateLightbox(direction) {
    const currentImageId = parseInt(document.querySelector('.gallery-item[data-id]').dataset.id);
    const currentIndex = galleryData.findIndex(img => img.id === currentImageId);
    const newIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
    openLightbox(galleryData[newIndex]);
}

// Filter gallery function - called by onclick
function filterGallery(category) {
    currentCategory = category;
    loadGallery();
    
    // Should update active class on filter buttons
    // But this is handled by the event listener instead
    // Creating inconsistent behavior
}

// Missing lazy loading implementation
function lazyLoadImages() {
    const images = document.querySelectorAll('.gallery-item img');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, options);
    
    images.forEach(img => {
        observer.observe(img);
    });
}

// Missing proper pagination
function setupPagination() {
    const itemsPerPage = 9;
    let currentPage = 1;
    
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(galleryData.length / itemsPerPage);
    
    function renderPage(page) {
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = galleryData.slice(start, end);
        
        // Render gallery with paginated data
        loadGallery(paginatedData);
        
        // Update pagination controls
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => renderPage(i));
            paginationContainer.appendChild(button);
        }
    }
    
    renderPage(currentPage);
}

// Missing proper error handling
window.onerror = function(message, source, lineno, colno, error) {
    console.error(`Error: ${message} at ${source}:${lineno}:${colno}`, error);
};

// Call lazyLoadImages and setupPagination on page load
window.onload = function() {
    loadGallery();
    setupLightbox();
    lazyLoadImages();
    setupPagination();
    
    // Event listener for filter clicks
    const filters = document.querySelectorAll('.gallery-filters span');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update current category and reload gallery
            currentCategory = this.getAttribute('data-category');
            loadGallery();
        });
    });
    
    // Form submission handling - with issues
    const form = document.querySelector('.upload-section form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Just shows alert instead of actual upload logic
            alert('Photo upload functionality is not implemented yet.');
            // Doesn't validate form
            this.reset();
        });
    }
};