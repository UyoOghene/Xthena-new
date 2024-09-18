
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

// Environment variables
window.env = {
  New_api_key: "AIzaSyCu8mYDdD5P530zXZZoaDJOcG188FQeKPU"
};

// Firebase configuration
const firebaseConfig = {
  apiKey: window.env.New_api_key,
  authDomain: "xthena-252cd.firebaseapp.com",
  projectId: "xthena-252cd",
  storageBucket: "xthena-252cd.appspot.com",
  messagingSenderId: "1092271625443",
  appId: "1:1092271625443:web:4ce3283093f6b0371261d6",
  databaseURL: "https://xthena-252cd-default-rtdb.firebaseio.com/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Get a reference to the database
const db = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const user = auth.currentUser;
// const analytics = getAnalytics(app);
const provider2 = new FacebookAuthProvider();



// Reference to contactInfo in the database
const contactInfoRef = ref(db, "contactInfo");

// Variables
const googleBtn = document.querySelector('#googleBtn');
const loginContainer = document.querySelector('.login-container');
const emailInput = document.querySelector('#email-input');
const nameInput = document.querySelector('#name-input');
const messageInput = document.querySelector('#phone-input');
const contactForm = document.querySelector('#contact-form');
const contact = document.querySelector('#contact');
const showcase = document.querySelector('#showcase');
const profession = document.querySelector('#profession');
const slogan = document.querySelector('#slogan');
const serviceSect = document.querySelector('#service-section');
const navBar = document.querySelector('#navbar');
const contactSubmitBtn = document.querySelector('#contactsubmit-btn');
const servicesLink = document.querySelector('#services-a');
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('#nav-ul');

// Functions

// Show button when user scrolls down
// Get the modal element
var modal = document.getElementById("imgModal");

// Get the image inside the modal and the description element
var modalImg = document.getElementById("modalImg");
var imgDescription = document.getElementById("imgDescription");

// Get all project images and attach a click event to each
var images = document.querySelectorAll(".proj-box");
images.forEach(function(imageBox) {
  imageBox.addEventListener("click", function() {
    var imgSrc = this.querySelector(".projpic").src; // Get the image source
    var description = this.querySelector(".overlay .proj-description").textContent; // Get the description text
    
    // Set the modal content
    modal.style.display = "block";
    modalImg.src = imgSrc; // Show the image in the modal
    imgDescription.textContent = description; // Show the description in the modal
  });
});



// Close the modal when the user clicks outside the image
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const projBoxes = document.querySelectorAll(".proj-box");

// When you click on an image, open the modal
projBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    modal.style.display = "block";
    modalImg.src = imgSrc;
    document.body.classList.add("no-hover"); // Disable hover when modal is open
  });
});

// When the user clicks on <span> (x), close the modal
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("no-hover"); // Re-enable hover when modal is closed
};

window.onscroll = function() {
  var backToTopBtn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
};

// Smooth scroll to the top
document.getElementById("backToTopBtn").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// document.getElementById("facebook-login").addEventListener("click", function() {
//   signInWithPopup(auth, provider2)
//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;
    
//     if (user) {
//       console.log(user); 
//       alert("Welcome "+user.displayName);
//       window.location.href = './home.html'; 
//   }
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });		  		  
// });

// const onGoogleLogin = () => {
//   const user = auth.currentUser;
//   if (user) {
//       console.log(user.email); 
//       window.location.href = './home.html'; 
//   }
// };

// googleBtn.addEventListener('click', () => {
//   signInWithPopup(auth, provider)
//       .then((result) => {
//           const user = result.user;
//           console.log(user);
//           console.log('googlebtn');
//           localStorage.setItem('email', user.email);
//           localStorage.setItem('userStore', JSON.stringify(user));
//           localStorage.setItem('pic', user.photoURL);
//           loginContainer.style.display = 'none';
//           onGoogleLogin();
//       })
//       .catch((error) => {
//           console.error(error.code, error.message);
//       });
// });

function showToast(){
  Toastify({
    text: "Submit Successful!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
}

const storeInput = (e) => {
  e.preventDefault();
  showToast();
  const emailVal = emailInput.value;
  const nameVal = nameInput.value;
  const messageVal = messageInput.value;
  console.log('submit');
  console.log(emailVal);
  saveContactInfo(emailVal, nameVal, messageVal);
  emailInput.value = '';
  messageInput.value = '';
  nameInput.value = '';
};

const saveContactInfo = (email, name, message) => {
  const d = new Date();
  const date = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const newContactRef = push(contactInfoRef);
  set(newContactRef, {
    email: email,
    name: name,
    message: message,
    date: date,
  });
};

// Responsive navbar
navToggle.addEventListener('click', function() {
    alert("hki")
    // navUl.classList.toggle('show');
    navUl.style.display = 'block'
});
// navToggle.addEventListener('mouseover', function() {
//   navUl.classList.add('show');
// });

// navToggle.addEventListener('mouseout', function() {
//   navUl.classList.remove('show');
// });

// navUl.addEventListener('mouseover', function() {
//   navUl.classList.add('show');
// });

// navUl.addEventListener('mouseout', function() {
//   navUl.classList.remove('show');
// });


// Event Listeners
// contactSubmitBtn.addEventListener('click', storeInput);