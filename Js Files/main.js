const userNameSginUpInput = document.getElementById("userNameUp");
const userEmailSginUpInput = document.getElementById("userEmailUp");
const userPasswordSginUpInput = document.getElementById("userPasswordUp");
const userEmailSignInInput = document.getElementById("userEmail");
const userPasswordSignInInput = document.getElementById("userPassword");
const signInform = document.getElementById("signInForm");
const signUpform = document.getElementById("signUpForm");
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signin");
const signOutBtn = document.getElementById("signOut");
const mainCont = document.getElementById("mainCont");

let userData = [];
if (localStorage.getItem("user") === null) {
  userData = [];
} else {
  userData = JSON.parse(localStorage.getItem("user"));
}


// login page
let nameLog = "";
if (location.pathname.includes("signin.html")) {
  signInform.addEventListener("submit", function (e) {
    e.preventDefault();

    const userEmaail = userEmailSignInInput.value.trim();
    const userPassword = userPasswordSignInInput.value.trim();

    if (!userEmaail || !userPassword) {
      return document.getElementById("wirr").classList.remove("d-none");
    }
   

    let userFound = false;
    for (let i = 0; i < userData.length; i++) {
      if (
        userData[i].userEmail === userEmaail &&
        userData[i].userPassword === userPassword
      ) {
          
          nameLog = userData[i].userName;
          userFound = true;
          break;
        }
    }
    
    if (userData.length === 0) {
      alert("No users found! Please sign up first.");
      window.location.href = "index.html";
    }else if (userFound) {
        localStorage.setItem("userName", nameLog);
        
      window.location.href = "home.html";
    } else{
      alert("email or password not found");
    }
  });
}

// index page
if (location.pathname.includes("index.html")) {
  signUpform.addEventListener("submit", function (e) {
    e.preventDefault();
    let user = {
      userName: userNameSginUpInput.value.trim().toLowerCase(),
      userEmail: userEmailSginUpInput.value.trim(),
      userPassword: userPasswordSginUpInput.value.trim(),
    };
    const usernamePattern = /^[a-zA-Z]{3,15}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernamePattern.test(user.userName)) {
      return alert(
        "Username should be between 3 and 15 characters and contain only letters!"
      );
    }
    if (!emailPattern.test(user.userEmail)) {
      return alert(
        "Invalid email format! it should be like this example@gmail.com"
      );
    }
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userEmail == userEmailSginUpInput.value.trim()) {
        return alert("Email already exists!");
      } else if (userData[i].userName == userNameSginUpInput.value.trim()) {
        return alert("Username already exists!");
      }
    }

    userData.push(user);
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Sign up successful! Redirecting to sign in Page...");
    window.location.href = "signin.html";
  });
}

// home page
if (location.pathname.includes("home.html")) {
  const userLogin = localStorage.getItem("userName");

  if(userLogin) {
    mainCont.innerHTML = `
  
          <h2 class="text-center display-3">Welcom ${userLogin}</h2> 
  
  `
  }else{
    alert("Please login to access this page!");
    window.location.href = "index.html";
  }

  signOutBtn.addEventListener("click", function () {
    localStorage.removeItem("userName");
    window.location.href = "index.html";
  });
}
