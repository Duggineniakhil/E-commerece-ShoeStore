document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const backToLoginBtn = document.getElementById("backToLoginBtn");

  const tabIndicator = document.querySelector(".tab-indicator");

  function setActiveForm(formType) {
    // reset
    loginForm.classList.remove("active");
    registerForm.classList.remove("active");
    forgotPasswordForm.classList.remove("active");
    loginTab.classList.remove("active");
    registerTab.classList.remove("active");

    if (formType === "login") {
      loginForm.classList.add("active");
      loginTab.classList.add("active");
      tabIndicator.style.transform = "translateX(0)";
    } else if (formType === "register") {
      registerForm.classList.add("active");
      registerTab.classList.add("active");
      tabIndicator.style.transform = "translateX(100%)";
    } else if (formType === "forgot") {
      forgotPasswordForm.classList.add("active");
      // no tab highlight change
    }
  }

  // Tab clicks
  loginTab.addEventListener("click", () => setActiveForm("login"));
  registerTab.addEventListener("click", () => setActiveForm("register"));

  // Forgot password link
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveForm("forgot");
  });

  // Back to login from forgot-password form
  backToLoginBtn.addEventListener("click", () => setActiveForm("login"));

  // Login submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
      alert("Enter both username/email and password.");
      return;
    }

    console.log("Login submitted:", { username, password });
    alert("Login functionality would be implemented here.");
  });

  // Register submit
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !password || !confirmPassword) {
      alert("Fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register submitted:", { username, email, password });
    alert("Registration functionality would be implemented here.");
  });

  // Forgot password submit
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value.trim();

    if (!email) {
      alert("Enter your email.");
      return;
    }

    console.log("Password reset requested for:", email);
    alert("Password reset link would be sent to your email.");
    setActiveForm("login");
  });

  // Default state
  setActiveForm("login");
});
