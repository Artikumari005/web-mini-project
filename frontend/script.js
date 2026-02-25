/**
 * India Last Minute Engineering College
 * Client-side Form Validation JavaScript
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize enquiry form validation
    initEnquiryForm();
    
});

/**
 * Mobile Menu Toggle Functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

/**
 * Enquiry Form Validation
 */
function initEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    
    if (!form) return;
    
    // Get form elements
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const courseInterest = document.getElementById('courseInterest');
    const message = document.getElementById('message');
    
    // Add event listeners for real-time validation
    fullName.addEventListener('blur', validateFullName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    courseInterest.addEventListener('blur', validateCourseInterest);
    message.addEventListener('blur', validateMessage);
    
    // Add input event listeners to clear errors on typing
    fullName.addEventListener('input', clearError);
    email.addEventListener('input', clearError);
    phone.addEventListener('input', clearError);
    courseInterest.addEventListener('input', clearError);
    message.addEventListener('input', clearError);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isCourseInterestValid = validateCourseInterest();
        const isMessageValid = validateMessage();
        
        // Check if all validations pass
        if (isFullNameValid && isEmailValid && isPhoneValid && 
            isCourseInterestValid && isMessageValid) {
            
            // Show success message
            showSuccessMessage();
            
            // Log form data (for demonstration)
            console.log('Form submitted successfully!');
            console.log('Form Data:', {
                fullName: fullName.value,
                email: email.value,
                phone: phone.value,
                courseInterest: courseInterest.value,
                queryType: document.getElementById('queryType').value,
                message: message.value
            });
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Reset form validation
    form.addEventListener('reset', function() {
        clearAllErrors();
    });
}

/**
 * Validate Full Name
 * Rules: Required, minimum 3 characters, letters and spaces only
 */
function validateFullName() {
    const field = document.getElementById('fullName');
    const errorElement = document.getElementById('fullNameError');
    const value = field.value.trim();
    
    // Clear previous state
    field.classList.remove('error', 'valid');
    errorElement.textContent = '';
    
    // Check if empty
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'Please enter your full name';
        return false;
    }
    
    // Check minimum length
    if (value.length < 3) {
        field.classList.add('error');
        errorElement.textContent = 'Name must be at least 3 characters long';
        return false;
    }
    
    // Check if contains only letters and spaces
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(value)) {
        field.classList.add('error');
        errorElement.textContent = 'Name should contain only letters and spaces';
        return false;
    }
    
    // Valid
    field.classList.add('valid');
    return true;
}

/**
 * Validate Email Address
 * Rules: Required, valid email format
 */
function validateEmail() {
    const field = document.getElementById('email');
    const errorElement = document.getElementById('emailError');
    const value = field.value.trim();
    
    // Clear previous state
    field.classList.remove('error', 'valid');
    errorElement.textContent = '';
    
    // Check if empty
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'Please enter your email address';
        return false;
    }
    
    // Email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
        field.classList.add('error');
        errorElement.textContent = 'Please enter a valid email address (e.g., name@example.com)';
        return false;
    }
    
    // Valid
    field.classList.add('valid');
    return true;
}

/**
 * Validate Phone Number
 * Rules: Required, valid 10-digit Indian mobile number
 */
function validatePhone() {
    const field = document.getElementById('phone');
    const errorElement = document.getElementById('phoneError');
    const value = field.value.trim();
    
    // Clear previous state
    field.classList.remove('error', 'valid');
    errorElement.textContent = '';
    
    // Check if empty
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'Please enter your phone number';
        return false;
    }
    
    // Remove any spaces or dashes
    const cleanValue = value.replace(/[\s-]/g, '');
    
    // Check if it's exactly 10 digits
    const phonePattern = /^[6-9]\d{9}$/;
    
    if (!phonePattern.test(cleanValue)) {
        field.classList.add('error');
        errorElement.textContent = 'Please enter a valid 10-digit mobile number (starting with 6-9)';
        return false;
    }
    
    // Valid
    field.classList.add('valid');
    return true;
}

/**
 * Validate Course Interest
 * Rules: Required, must select an option
 */
function validateCourseInterest() {
    const field = document.getElementById('courseInterest');
    const errorElement = document.getElementById('courseInterestError');
    const value = field.value;
    
    // Clear previous state
    field.classList.remove('error', 'valid');
    errorElement.textContent = '';
    
    // Check if empty (default option selected)
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'Please select a course of interest';
        return false;
    }
    
    // Valid
    field.classList.add('valid');
    return true;
}

/**
 * Validate Message
 * Rules: Required, minimum 10 characters
 */
function validateMessage() {
    const field = document.getElementById('message');
    const errorElement = document.getElementById('messageError');
    const value = field.value.trim();
    
    // Clear previous state
    field.classList.remove('error', 'valid');
    errorElement.textContent = '';
    
    // Check if empty
    if (value === '') {
        field.classList.add('error');
        errorElement.textContent = 'Please enter your message';
        return false;
    }
    
    // Check minimum length
    if (value.length < 10) {
        field.classList.add('error');
        errorElement.textContent = `Message must be at least 10 characters (currently ${value.length} characters)`;
        return false;
    }
    
    // Valid
    field.classList.add('valid');
    return true;
}

/**
 * Clear error styling when user starts typing
 */
function clearError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + 'Error');
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Clear all error messages and styling
 */
function clearAllErrors() {
    const fields = ['fullName', 'email', 'phone', 'courseInterest', 'message'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.remove('error', 'valid');
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
    
    // Hide success message if visible
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('enquiryForm');
    
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    if (form) {
        form.style.display = 'block';
    }
}

/**
 * Show success message after form validation
 */
function showSuccessMessage() {
    const form = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Reset form to initial state
 */
function resetForm() {
    const form = document.getElementById('enquiryForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.reset();
        clearAllErrors();
        
        form.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Scroll back to form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Show error for a field
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
        field.classList.remove('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Utility: Show success for a field
 */
function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.remove('error');
        field.classList.add('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateFullName,
        validateEmail,
        validatePhone,
        validateCourseInterest,
        validateMessage,
        resetForm
    };
}

