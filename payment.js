// payment.js
document.addEventListener('DOMContentLoaded', function() {
  const paymentForm = document.getElementById('paymentForm');
  const paymentSuccess = document.getElementById('paymentSuccess');
  const cardNumberInput = document.getElementById('cardNumber');
  const expiryInput = document.getElementById('expiry');
  const cvvInput = document.getElementById('cvv');
  const cardTypeDisplay = document.querySelector('.card-type');
  
  // Format card number with spaces
  cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;
    detectCardType(value.replace(/\s/g, ''));
  });
  
  // Format expiry date
  expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value.substring(0, 5);
  });
  
  // Detect card type and display logo
  function detectCardType(cardNumber) {
    let cardType = '';
    const firstDigit = cardNumber.charAt(0);
    
    if (/^4/.test(cardNumber)) {
      cardType = 'visa';
    } else if (/^5[1-5]/.test(cardNumber)) {
      cardType = 'mastercard';
    } else if (/^3[47]/.test(cardNumber)) {
      cardType = 'amex';
    } else if (/^6(?:011|5)/.test(cardNumber)) {
      cardType = 'discover';
    }
    
    if (cardType) {
      cardTypeDisplay.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cardType}/${cardType}-original.svg)`;
      cardTypeDisplay.style.display = 'block';
    } else {
      cardTypeDisplay.style.display = 'none';
    }
  }
  
  // Form submission
  paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Simulate payment processing
    simulatePayment();
  });
  
  // Form validation
  function validateForm() {
    let isValid = true;
    
    // Validate card number (simple validation)
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (cardNumber.length < 16 || !/^\d+$/.test(cardNumber)) {
      showError(cardNumberInput, 'Please enter a valid card number');
      isValid = false;
    } else {
      clearError(cardNumberInput);
    }
    
    // Validate expiry date
    const expiry = expiryInput.value;
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      showError(expiryInput, 'Please enter a valid expiry date (MM/YY)');
      isValid = false;
    } else {
      clearError(expiryInput);
    }
    
    // Validate CVV
    const cvv = cvvInput.value;
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      showError(cvvInput, 'Please enter a valid CVV');
      isValid = false;
    } else {
      clearError(cvvInput);
    }
    
    // Validate terms checkbox
    const termsChecked = document.getElementById('terms').checked;
    if (!termsChecked) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      isValid = false;
    }
    
    return isValid;
  }
  
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let error = formGroup.querySelector('.error-message');
    
    if (!error) {
      error = document.createElement('div');
      error.className = 'error-message';
      formGroup.appendChild(error);
    }
    
    error.textContent = message;
    input.style.borderColor = 'var(--error-color)';
  }
  
  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
      error.remove();
    }
    
    input.style.borderColor = 'var(--border-color)';
  }
  
  // Simulate payment processing
  function simulatePayment() {
    // Show loading state
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(function() {
      // Hide form and show success message
      paymentForm.style.display = 'none';
      paymentSuccess.style.display = 'block';
      
      // Scroll to success message
      paymentSuccess.scrollIntoView({ behavior: 'smooth' });
      
      // Update confirmation email
      const email = document.getElementById('email').value;
      document.querySelector('.confirmation-email strong').textContent = email;
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
  
  // Apply coupon code
  document.querySelector('.apply-coupon').addEventListener('click', function() {
    const couponInput = document.getElementById('coupon');
    const couponCode = couponInput.value.trim();
    
    if (!couponCode) {
      alert('Please enter a coupon code');
      return;
    }
    
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'DAC20') {
      alert('Coupon applied! You get 20% off your first payment.');
      // Update the total amount here in a real implementation
    } else {
      alert('Invalid coupon code');
    }
  });
});