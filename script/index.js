// ANIMATION for Past Works Section and Call to Action
const pastImg = document.querySelectorAll('.past-img, #call-to-action');

if (pastImg.length) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('past-img')) {
        entry.target.classList.toggle("past-img-animation", entry.isIntersecting);
      } else {
        entry.target.classList.toggle("cta-animate", entry.isIntersecting);
      }

      // Stop observing once animation is triggered
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.3
  });

  pastImg.forEach(im => observer.observe(im));
}

// ANIMATION for Focus Section
const focus = document.querySelectorAll('.from-left, .from-right');

if (focus.length) {
  const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('from-left')) {
        entry.target.classList.toggle("left-animate", entry.isIntersecting);
      } else {
        entry.target.classList.toggle("right-animate", entry.isIntersecting);
      }

      // // Stop observing once animation is triggered
      // if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2
  });

  focus.forEach(im => slideObserver.observe(im));
}