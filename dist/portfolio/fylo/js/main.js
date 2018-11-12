// Validate Email Form

const email = document.querySelector("#email");
const emailSubmit = document.querySelector("#email-submit");
const message = document.querySelector("#validation");

const validateEmail = function() {
  if (email.value === "") {
    message.innerHTML = `<span class="fail">Please enter your email</span>`;
    setTimeout(() => (message.innerHTML = ""), 5000);
  } else {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(String(email.value).toLowerCase())) {
      message.innerHTML = `<span class="success">Thank you for subscribing!</span>`;
      setTimeout(() => (message.innerHTML = ""), 5000);
    } else {
      message.innerHTML = `<span class="fail">Enter a valid email</span>`;
      setTimeout(() => (message.innerHTML = ""), 5000);
    }
  }
};

emailSubmit.addEventListener("click", validateEmail);
