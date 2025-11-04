// ============================================
// MONTRA THAI MASSAGE - BOOKING PAGE JAVASCRIPT
// Handles multi-step form and appointment booking
// ============================================

// Store booking data
let bookingData = {
    service: '',
    serviceName: '',
    duration: '',
    price: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    firstTime: false
};

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding content
        const tabName = this.getAttribute('data-tab');
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// Service Selection
document.querySelectorAll('.service-option').forEach(option => {
    option.addEventListener('click', function() {
        // Update radio button
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Store service data
        bookingData.service = radio.value;
        bookingData.serviceName = this.querySelector('h4').textContent;
        bookingData.duration = this.getAttribute('data-duration');
        bookingData.price = '$' + this.getAttribute('data-price');
    });
});

// Time Slot Selection
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        // Remove selected class from all slots
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        
        // Add selected class to clicked slot
        this.classList.add('selected');
        
        // Store time
        bookingData.time = this.getAttribute('data-time');
    });
});

// Date Selection
document.getElementById('appointmentDate').addEventListener('change', function() {
    bookingData.date = this.value;
    
    // Format date nicely
    const dateObj = new Date(this.value + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    bookingData.dateFormatted = dateObj.toLocaleDateString('en-US', options);
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('appointmentDate').setAttribute('min', today);

// Step Navigation Functions
function nextStep(stepNumber) {
    // Validate current step
    const currentStep = document.querySelector('.form-step.active');
    const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));
    
    if (!validateStep(currentStepNumber)) {
        return;
    }
    
    // Hide current step
    currentStep.classList.remove('active');
    
    // Show next step
    const nextStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    nextStep.classList.add('active');
    
    // Scroll to top of form
    document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep(stepNumber) {
    // Hide current step
    document.querySelector('.form-step.active').classList.remove('active');
    
    // Show previous step
    const prevStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    prevStep.classList.add('active');
    
    // Scroll to top of form
    document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Validate Steps
function validateStep(stepNumber) {
    let isValid = true;
    let errorMessage = '';
    
    switch(stepNumber) {
        case 1:
            // Check if service is selected
            if (!bookingData.service) {
                errorMessage = 'Please select a service';
                isValid = false;
            }
            break;
            
        case 2:
            // Check if date and time are selected
            if (!bookingData.date) {
                errorMessage = 'Please select a date';
                isValid = false;
            } else if (!bookingData.time) {
                errorMessage = 'Please select a time';
                isValid = false;
            }
            break;
            
        case 3:
            // Get form values
            bookingData.firstName = document.getElementById('firstName').value.trim();
            bookingData.lastName = document.getElementById('lastName').value.trim();
            bookingData.email = document.getElementById('email').value.trim();
            bookingData.phone = document.getElementById('phone').value.trim();
            bookingData.notes = document.getElementById('notes').value.trim();
            bookingData.firstTime = document.getElementById('firstTime').checked;
            
            // Validate required fields
            if (!bookingData.firstName) {
                errorMessage = 'Please enter your first name';
                isValid = false;
            } else if (!bookingData.lastName) {
                errorMessage = 'Please enter your last name';
                isValid = false;
            } else if (!bookingData.email) {
                errorMessage = 'Please enter your email address';
                isValid = false;
            } else if (!isValidEmail(bookingData.email)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            } else if (!bookingData.phone) {
                errorMessage = 'Please enter your phone number';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        alert(errorMessage);
    }
    
    return isValid;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Review Booking
function reviewBooking() {
    if (!validateStep(3)) {
        return;
    }
    
    // Populate summary
    document.getElementById('summaryService').textContent = bookingData.serviceName;
    document.getElementById('summaryDuration').textContent = bookingData.duration;
    document.getElementById('summaryPrice').textContent = bookingData.price;
    document.getElementById('summaryDate').textContent = bookingData.dateFormatted || bookingData.date;
    document.getElementById('summaryTime').textContent = bookingData.time;
    document.getElementById('summaryName').textContent = bookingData.firstName + ' ' + bookingData.lastName;
    document.getElementById('summaryEmail').textContent = bookingData.email;
    document.getElementById('summaryPhone').textContent = bookingData.phone;
    document.getElementById('confirmPhone').textContent = bookingData.phone;
    
    // Go to review step
    nextStep(4);
}

// Form Submission
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, this would send data to your server
    console.log('Booking submitted:', bookingData);
    
    // Show success message
    alert('Thank you! Your booking request has been submitted. We will call you at ' + bookingData.phone + ' to confirm your appointment within 24 hours.');
    
    // Optionally, you could redirect to a thank you page
    // window.location.href = 'booking-confirmation.html';
    
    // Or reset the form
    // resetBookingForm();
});

// Reset Form
function resetBookingForm() {
    // Clear booking data
    bookingData = {
        service: '',
        serviceName: '',
        duration: '',
        price: '',
        date: '',
        time: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: '',
        firstTime: false
    };
    
    // Reset form
    document.getElementById('appointmentForm').reset();
    
    // Remove selections
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    
    // Go back to first step
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
}

// Console message
console.log('📅 Booking page loaded successfully!');
console.log('💆‍♀️ Ready to book your massage appointment!');