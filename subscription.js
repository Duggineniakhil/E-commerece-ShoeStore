// subscription.js
document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
          otherItem.querySelector('.faq-answer').style.padding = '0 20px';
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      const answer = item.querySelector('.faq-answer');
      
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.padding = '0 20px';
      } else {
        answer.style.maxHeight = '0';
        answer.style.padding = '0 20px';
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Plan selection functionality
  const planButtons = document.querySelectorAll('.plan-card .btn');
  
  planButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planCard = this.closest('.plan-card');
      const planName = planCard.querySelector('h3').textContent;
      
      // In a real implementation, this would redirect to a checkout page
      alert(`You've selected the ${planName} plan. Redirecting to checkout...`);
    });
  });
});