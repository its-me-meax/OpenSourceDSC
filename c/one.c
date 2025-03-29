#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 1000
#define MAX_NAME_LENGTH 50
#define INITIAL_GRADE_CAPACITY 5

// Custom data structure for student records
typedef struct {
    char name[MAX_NAME_LENGTH];
    int age;
    float* grades;
    int grade_count;
    int grade_capacity;
} Student;

// Global array to store student records
Student* student_database[MAX_STUDENTS];
int total_students = 0;

// Function prototypes
Student* create_student(const char* name, int age);
int add_grade(Student* student, float grade);
void print_student_details(const Student* student);
void optimize_memory_usage();
void free_student_database();

int main() {
    // Sample initialization
    Student* s1 = create_student("Alice", 20);
    add_grade(s1, 85.5);
    add_grade(s1, 90.0);
    add_grade(s1, 87.5);
    
    print_student_details(s1);

    // Free allocated memory
    free_student_database();

    return 0;
}

Student* create_student(const char* name, int age) {
    Student* new_student = malloc(sizeof(Student));
    if (new_student == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }
    
    // Prevent buffer overflow
    strncpy(new_student->name, name, MAX_NAME_LENGTH - 1);
    new_student->name[MAX_NAME_LENGTH - 1] = '\0';
    
    new_student->age = age;
    new_student->grades = malloc(INITIAL_GRADE_CAPACITY * sizeof(float));
    if (new_student->grades == NULL) {
        free(new_student);
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }
    new_student->grade_count = 0;
    new_student->grade_capacity = INITIAL_GRADE_CAPACITY;
    
    // Add to global database
    if (total_students < MAX_STUDENTS) {
        student_database[total_students++] = new_student;
    } else {
        free(new_student->grades);
        free(new_student);
        fprintf(stderr, "Student database is full\n");
        exit(EXIT_FAILURE);
    }
    
    return new_student;
}

int add_grade(Student* student, float grade) {
    // Efficient memory allocation strategy
    if (student->grade_count >= student->grade_capacity) {
        student->grade_capacity *= 2;
        float* new_grades = realloc(student->grades, student->grade_capacity * sizeof(float));
        if (new_grades == NULL) {
            return 0;  // Allocation failed
        }
        student->grades = new_grades;
    }
    
    student->grades[student->grade_count++] = grade;
    return 1;
}

void print_student_details(const Student* student) {
    printf("Name: %s\n", student->name);
    printf("Age: %d\n", student->age);
    printf("Grades: ");
    for (int i = 0; i < student->grade_count; i++) {
        printf("%.2f ", student->grades[i]);
    }
    printf("\n");
}

void free_student_database() {
    for (int i = 0; i < total_students; i++) {
        free(student_database[i]->grades);
        free(student_database[i]);
    }
}