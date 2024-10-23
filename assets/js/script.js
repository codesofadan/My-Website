'use strict';  // Enables strict mode which catches common coding mistakes and 'unsafe' actions like using undeclared variables.

/**
 * add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  // Iterates through the provided elements array and attaches an event listener to each element.
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback); // Adds the specified event (e.g., "click") and the callback function to each element.
  }
}


/**
 * PRELOADER
 */
const preloader = document.querySelector("[data-preloader]"); // Selects the element with the 'data-preloader' attribute (likely a loading screen).

window.addEventListener("DOMContentLoaded", function () {
  // When the page content is fully loaded, this event fires.
  preloader.classList.add("loaded"); // Adds 'loaded' class to the preloader element, likely to hide or fade it out.
  document.body.classList.add("loaded"); // Adds 'loaded' class to the body to apply any related styles once loading completes.
});


/**
 * NAVBAR
 * Navbar toggle for mobile
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]"); // Selects all elements that can toggle the navbar.
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]"); // Selects the navbar toggle button.
const navbar = document.querySelector("[data-navbar]"); // Selects the navbar itself.
const overlay = document.querySelector("[data-overlay]"); // Selects the overlay element (a screen darkener that appears when the navbar opens).

// Function to toggle the visibility of the navbar.
const toggleNavbar = function () {
  navbar.classList.toggle("active"); // Toggles the 'active' class on the navbar, likely to show/hide it.
  navToggleBtn.classList.toggle("active"); // Toggles the 'active' class on the navbar toggle button to change its state (open/close).
  overlay.classList.toggle("active"); // Toggles the 'active' class on the overlay, possibly making it visible when the navbar is open.
  document.body.classList.toggle("nav-active"); // Toggles a class on the body to indicate that the navbar is active (possibly preventing scroll).
}

// Attaches the toggleNavbar function to each nav toggler element (for example, a burger menu icon).
addEventOnElements(navTogglers, "click", toggleNavbar);


/**
 * HEADER
 * Header becomes active when window scrolls down to 100px
 */
const header = document.querySelector("[data-header]"); // Selects the header element for manipulation.

window.addEventListener("scroll", function () {
  // Adds a scroll event listener to the window.
  if (window.scrollY >= 100) {
    header.classList.add("active"); // Adds the 'active' class to the header when the scroll position is greater than or equal to 100px.
  } else {
    header.classList.remove("active"); // Removes the 'active' class if the scroll position is less than 100px.
  }
});


/**
 * SLIDER
 */
const sliders = document.querySelectorAll("[data-slider]"); // Selects all slider elements.

const initSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector("[data-slider-container]"); // Selects the slider container within the current slider.
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]"); // Selects the "previous slide" button.
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]"); // Selects the "next slide" button.

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items")); // Gets the number of visible items (from CSS).
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems; // Calculates the number of items that can be slided.

  let currentSlidePos = 0; // Tracks the current position of the slide.

  // Function to move the slider to the current position.
  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`; // Translates the slider container to show the correct slide.
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems; // Checks if the current slide is at the end.

    if (slideEnd) {
      currentSlidePos = 0; // If at the end, go back to the first slide.
    } else {
      currentSlidePos++; // Otherwise, go to the next slide.
    }

    moveSliderItem(); // Move the slider to the new position.
  }

  sliderNextBtn.addEventListener("click", slideNext); // Attaches the 'slideNext' function to the "next" button.

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems; // If at the first slide, go to the last.
    } else {
      currentSlidePos--; // Otherwise, go to the previous slide.
    }

    moveSliderItem(); // Move the slider to the new position.
  }

  sliderPrevBtn.addEventListener("click", slidePrev); // Attaches the 'slidePrev' function to the "previous" button.

  const dontHaveExtraItem = totalSlidableItems <= 0; // Checks if there are enough items to slide.

  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none'; // Hides the next button if there are not enough items.
    sliderPrevBtn.style.display = 'none'; // Hides the previous button if there are not enough items.
  }

  /**
   * slide with [shift + mouse wheel]
   */
  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext(); // If Shift + wheel down, go to the next slide.
    if (event.shiftKey && event.deltaY < 0) slidePrev(); // If Shift + wheel up, go to the previous slide.
  });

  /**
   * RESPONSIVE
   */
  window.addEventListener("resize", function () {
    // Adjusts the number of visible items and slidable items when the window is resized.
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem(); // Reposition the slider after resizing.
  });
}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); } // Initializes sliders for all elements.


/**
 * FAQ Section Toggle
 */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement; // Gets the parent element (FAQ item).
    const faqAnswer = faqItem.querySelector('.faq-answer'); // Gets the answer element for the clicked question.

    const isExpanded = button.getAttribute('aria-expanded') === 'true'; // Checks if the question is already expanded.
    button.setAttribute('aria-expanded', !isExpanded); // Toggles the 'aria-expanded' attribute to indicate expanded/collapsed state.

    if (isExpanded) {
      faqAnswer.style.maxHeight = null; // Collapses the answer if it was expanded.
    } else {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px'; // Expands the answer by setting its max-height to its scroll height.
    }
  });
});


/**
 * Form Submission
 */
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from being submitted the traditional way (refreshing the page).

  const form = event.target; // Gets the form element.
  const formData = new FormData(form); // Gathers all form data.

  // Sends the form data to the server using the Fetch API.
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('Thank you for your message!'); // Alerts the user upon successful submission.
      form.reset(); // Resets the form.
    } else {
      alert('Oops! There was a problem submitting your form'); // Alerts the user if the submission fails.
    }
  }).catch(error => {
    alert('Oops! There was a problem submitting your form'); // Alerts the user if there is a network error.
  });
});


/**
 * Glowing Circle Follows Mouse
 */
const glowingCircle = document.getElementById('glowing-circle'); // Selects the glowing circle element.

// Updates the position of the glowing circle to follow the cursor.
function updateCirclePosition(x, y) {
  glowingCircle.style.transform = `translate(${x}px, ${y}px)`; // Sets the position of the glowing circle using CSS transform.
}

// Mouse move event to follow the cursor
document.addEventListener('mousemove', (e) => {
  const x = e.clientX; // Gets the X coordinate of the cursor.
  const y = e.clientY; // Gets the Y coordinate of the cursor.
  updateCirclePosition(x, y); // Updates the position of the circle based on cursor position.
});

