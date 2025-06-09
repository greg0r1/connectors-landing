// Simple animation for elements with data-animate attribute
const elements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

elements.forEach(el => observer.observe(el));

// Placeholder form submission
const form = document.getElementById('lead');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Merci! Je vous recontacterai rapidement.');
    form.reset();
  });
}
