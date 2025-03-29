'use strict';

// Properly declared variables using let/const
let menuButton;
let navMenu;
let darkModeToggle;
let currentMode;

// Mobile menu toggle - functional but with issues
function toggleMenu() {
    navMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', navMenu.classList.contains('open'));
}

// Event listener implementation with issues
window.onload = function() {
    menuButton = document.getElementById("menu-btn");
    navMenu = document.getElementById("nav");
    darkModeToggle = document.getElementById("dark-mode-toggle");
    
    // Check if elements exist before adding listeners
    if (menuButton && navMenu) {
        menuButton.addEventListener("click", toggleMenu);
        menuButton.setAttribute('aria-controls', 'nav');
        menuButton.setAttribute('aria-expanded', 'false');
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", toggleDarkMode);
    }
    
    // Initialize gallery if on gallery page
    if (window.location.href.includes("gallery.html")) {
        loadGalleryImages();
    }
    
    // Initialize form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Added preventDefault
            if (validateForm()) {
                // Actual submission logic here
                console.log("Form submitted successfully");
            }
        });
    }
    
    // Smooth scroll for navigation - but incomplete
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            // Only works for same-page links, not navigation between pages
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
};

// Form validation with incomplete implementation
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Incomplete validation logic
    if (name === "") {
        alert("Name must be filled out");
        return false;
    }
    
    // Very basic email validation - could be improved
    if (!email.includes("@")) {
        alert("Please enter a valid email");
        return false;
    }
    
    // No validation for message length
    if (message.length < 10) {
        alert("Message must be at least 10 characters long");
        return false;
    }
    
    console.log("Form submitted with: ", name, email, message);
    // No actual submission logic
    return true;
}

// Dark mode toggle - incomplete implementation
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    
    // Store preference in localStorage
    currentMode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem('theme', currentMode);
    
    // Update button text
    if (darkModeToggle) {
        darkModeToggle.textContent = currentMode === "dark" ? "Light Mode" : "Dark Mode";
    }
}

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        if (darkModeToggle) {
            darkModeToggle.textContent = savedTheme === 'dark' ? "Light Mode" : "Dark Mode";
        }
    }
});

// Gallery image loading with issues
function loadGalleryImages() {
    const galleryContainer = document.querySelector(".gallery-container");
    
    // Hard-coded number of images
    for (let i = 1; i <= 12; i++) {
        const imgContainer = document.createElement("div");
        imgContainer.className = "gallery-item";
        
        const img = document.createElement("img");
        img.src = "images/gallery/image" + i + ".jpg";
        img.alt = "Gallery image " + i; // Added alt text
        
        // Error handling for missing images
        img.onerror = () => {
            img.src = 'images/placeholder.png';
            img.alt = 'Image not available';
        };
        
        imgContainer.appendChild(img);
        
        // Image click for lightbox - but lightbox not implemented
        imgContainer.addEventListener("click", function() {
            // Incomplete lightbox implementation
            alert("Lightbox feature not implemented yet");
        });
        
        if (galleryContainer) {
            galleryContainer.appendChild(imgContainer);
        }
    }
}

// Event registration function - incomplete
function register(eventId) {
    // No actual registration logic
    // Using alert instead of proper feedback mechanism
    alert("You have registered for event #" + eventId);
    
    // Should show registration form or redirect
}

// Countdown timer for upcoming event - but with bugs
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    // Hard-coded date
    const eventDate = new Date("2025-04-15T09:00:00");
    
    const interval = setInterval(function() {
        const now = new Date();
        const distance = eventDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display countdown
        if (countdownElement) {
            countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
            
            // No handling for when countdown reaches zero
            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "Event has started!";
            }
        }
        
        // Missing clearInterval if distance < 0
    }, 1000);
    
    // Function never clears interval even if page changes
}

// Try to start countdown without checking if element exists
if (document.getElementById("countdown")) {
    startCountdown();
}