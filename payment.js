// payment.js
document.addEventListener("DOMContentLoaded", function () {
  const paymentForm = document.getElementById("paymentForm");
  const paymentSuccess = document.getElementById("paymentSuccess");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryInput = document.getElementById("expiry");
  const cvvInput = document.getElementById("cvv");
  const couponInput = document.getElementById("coupon");
  const cardTypeDisplay = document.querySelector(".card-type");

  const totalAmountEl = document.querySelector(".total .amount");
  const btnTextEl = document.querySelector(".btn-text");
  const amountPaidEl = document.querySelector(".amount-paid");
  const emailConfirmEl = document.querySelector(".confirmation-email strong");
  const steps = document.querySelectorAll(".payment-steps .step");

  const applyCouponBtn = document.querySelector(".apply-coupon");

  // Cart badge support (same pattern as products page)
  const cartBadge = document.querySelector(".cart-badge");
  const CART_KEY = "cart";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function updateCartBadge() {
    if (!cartBadge) return;
    const cart = getCart();
    const count = cart.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    cartBadge.textContent = count;
  }

  updateCartBadge();

  // Amount handling
  function parseAmount(text) {
    return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
  }

  let baseAmount = parseAmount(totalAmountEl.textContent) || 499;
  let currentAmount = baseAmount;
  let couponApplied = false;

  function formatAmount(amount) {
    return "₹" + amount.toFixed(2);
  }

  function updateAmountDisplay() {
    const formatted = formatAmount(currentAmount);
    totalAmountEl.textContent = formatted;
    btnTextEl.textContent = `Pay ${formatted}`;
    amountPaidEl.textContent = formatted;
  }

  // Initialize amount
  updateAmountDisplay();

  // Format card number with spaces
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\s+/g, "");
    value = value.replace(/\D/g, "");
    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join(" ");
    }
    e.target.value = value.substring(0, 19);
    detectCardType(value.replace(/\s/g, ""));
  });

  // Format expiry date
  expiryInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value.substring(0, 5);
  });

  // Restrict CVV to digits
  cvvInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    e.target.value = value.substring(0, 4);
  });

  // Detect card type and display logo
  function detectCardType(cardNumber) {
    let cardType = "";
    if (/^4/.test(cardNumber)) {
      cardType = "visa";
    } else if (/^5[1-5]/.test(cardNumber)) {
      cardType = "mastercard";
    } else if (/^3[47]/.test(cardNumber)) {
      cardType = "amex";
    } else if (/^6(?:011|5)/.test(cardNumber)) {
      cardType = "discover";
    }

    if (cardType) {
      cardTypeDisplay.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cardType}/${cardType}-original.svg)`;
      cardTypeDisplay.style.display = "block";
    } else {
      cardTypeDisplay.style.display = "none";
    }
  }

  // Coupon handling
  applyCouponBtn.addEventListener("click", function () {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) {
      alert("Please enter a coupon code");
      return;
    }

    if (couponApplied) {
      alert("Coupon already applied");
      return;
    }

    if (code === "DAC20") {
      currentAmount = baseAmount * 0.8;
      couponApplied = true;
      updateAmountDisplay();
      alert("Coupon applied! You get 20% off your first payment.");
    } else {
      alert("Invalid coupon code");
    }
  });

  // Form submission
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    simulatePayment();
  });

  // Validation
  function validateForm() {
    let isValid = true;

    // Name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your full name");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email
    const emailVal = emailInput.value.trim();
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Card number
    const cardNumber = cardNumberInput.value.replace(/\s/g, "");
    if (cardNumber.length < 16 || !/^\d+$/.test(cardNumber)) {
      showError(cardNumberInput, "Please enter a valid card number");
      isValid = false;
    } else {
      clearError(cardNumberInput);
    }

    // Expiry
    const expiry = expiryInput.value;
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      showError(expiryInput, "Please enter a valid expiry date (MM/YY)");
      isValid = false;
    } else if (!isValidExpiry(expiry)) {
      showError(expiryInput, "Card has expired or date is invalid");
      isValid = false;
    } else {
      clearError(expiryInput);
    }

    // CVV
    const cvv = cvvInput.value;
    if (!/^\d{3,4}$/.test(cvv)) {
      showError(cvvInput, "Please enter a valid CVV");
      isValid = false;
    } else {
      clearError(cvvInput);
    }

    // Terms
    const termsChecked = document.getElementById("terms").checked;
    if (!termsChecked) {
      alert(
        "Please agree to the Terms of Service and Privacy Policy"
      );
      isValid = false;
    }

    return isValid;
  }

  function isValidExpiry(expiry) {
    const [mmStr, yyStr] = expiry.split("/");
    const mm = parseInt(mmStr, 10);
    const yy = parseInt(yyStr, 10);

    if (mm < 1 || mm > 12 || isNaN(mm) || isNaN(yy)) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100; // last 2 digits
    const currentMonth = now.getMonth() + 1;

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    return true;
  }

  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    let error = formGroup.querySelector(".error-message");

    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      formGroup.appendChild(error);
    }

    error.textContent = message;
    input.style.borderColor = "var(--error-color)";
  }

  function clearError(input) {
    const formGroup = input.closest(".form-group");
    const error = formGroup.querySelector(".error-message");

    if (error) {
      error.remove();
    }

    input.style.borderColor = "var(--border-color)";
  }

  // Simulate payment processing
  function simulatePayment() {
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalHtml = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    setTimeout(function () {
      paymentForm.style.display = "none";
      paymentSuccess.style.display = "block";

      // Mark step 3 active
      steps.forEach((step) => {
        if (step.dataset.step === "3") {
          step.classList.add("active");
        }
      });

      // Update confirmation email and amount
      const email = emailInput.value.trim();
      if (emailConfirmEl) {
        emailConfirmEl.textContent = email;
      }
      updateAmountDisplay();

      paymentSuccess.scrollIntoView({ behavior: "smooth" });

      submitBtn.innerHTML = originalHtml;
      submitBtn.disabled = false;
    }, 2000);
  }
});
