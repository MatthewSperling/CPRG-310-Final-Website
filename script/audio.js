// ANIMATION for Focus Section
const focus = document.querySelectorAll('.from-left, .from-right');

if (focus.length) {
  const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log('entere')
      if (entry.target.classList.contains('from-left')) {
        entry.target.classList.toggle("left-animate", entry.isIntersecting);
      } else {
        entry.target.classList.toggle("right-animate", entry.isIntersecting);
      }

      
    });
  }, {
    threshold: 0.2
  });

  focus.forEach(im => slideObserver.observe(im));
}