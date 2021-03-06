// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// +                            +
// -     Particles Js           -
// +                            +
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.25,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 1,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: false, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// +                            +
// -     Smooth Scrolling       -
// +                            +
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
// +                            +
// -     Form Validation        -
// +                            +
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
const form = document.getElementById("form");
const parent = document.getElementById("parent");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const submit = document.getElementById("submit");

// Validation Event

submit.addEventListener("click", e => {
  // Stop Submittig behavior
  e.preventDefault();
  if (
    name.value === "" ||
    email.value === "" ||
    subject.value === "" ||
    message.value === ""
  ) {
    // Show Error Message
    parent.innerHTML = `
      <div class="alert alert-danger my-2">
        <span>Please fill all the fields</span>
      </div>
    `;
    // Hide message after 3 seconds
    setTimeout(() => (parent.innerHTML = ""), 3000);
  } else {
    const dataString =
      "name=" +
      name.value +
      "&email=" +
      email.value +
      "&subject=" +
      subject.value +
      "&message=" +
      message.value;

    // Ajax to submit form
    $.ajax({
      type: "POST",
      url: "contactform.php",
      data: dataString,
      cache: false
    }).done(function() {
      clearFields();
      // Show Success Message
      parent.innerHTML = `
      <div class="alert alert-success my-2">
        <span>Email successfully sent!</span>
      </div>
    `;
      // Hide message after 3 seconds
      setTimeout(() => (parent.innerHTML = ""), 3000);
    });
  }
});

// Clear fields function
function clearFields() {
  name.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";
}
