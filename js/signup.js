var userName = document.getElementById("user_name");
var userEmail = document.getElementById("user_email");
var userPassword = document.getElementById("user_password");

var alertParagraph = document.getElementById("alert_paragraph");

var signupBtn = document.getElementById("signup_btn");

var loginAnchor = document.getElementById("login_anchor");

var usersList = [];

// *===================================== create data ========================================================================================

if (localStorage.getItem("users") !== null) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
  if (
    nameValidation() == true &&
    emailValidation() == true &&
    passwordValidation() == true
  ) {
    if (isEmpty() == false) {
      alertParagraph.classList.remove("d-none");
      alertParagraph.innerHTML =
        ' <span class="text-danger">All inputs are required</span> <i class="fa-solid fa-circle-xmark text-danger"></i> ';
      return false;
    }

    var user = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };

    if (usersList.length == 0) {
      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      alertParagraph.classList.remove("d-none");
      alertParagraph.innerHTML =
        ' <span class="text-success">SUCCESS</span> <i class="fa-solid fa-check text-success"></i> ';
      clearInputs();
      return true;
    }

    if (isEmailExist() == false) {
      alertParagraph.classList.remove("d-none");
      alertParagraph.innerHTML =
        ' <span class="text-warning">Email Is Exist</span> <i class="fa-solid fa-circle-exclamation text-warning"></i> ';
      return false;
    } else {
      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      alertParagraph.classList.remove("d-none");
      alertParagraph.innerHTML =
        ' <span class="text-success">SUCCESS</span> <i class="fa-solid fa-check text-success"></i> ';
      clearInputs();
    }
  } else {
    alertParagraph.classList.remove("d-none");
    alertParagraph.innerHTML =
      ' <span class="text-danger">All inputs are required</span> <i class="fa-solid fa-circle-xmark text-danger"></i> ';
    return false;
  }
}

// *====================================== create data  ===========================================================================

//!=============================================== function check email is exist ==============================================
function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email.toLowerCase() == userEmail.value.toLowerCase()) {
      return false;
    }
  }
}
//!=============================================== function check email is exist ===================================================

//^=============================================== function check inputs are empty or not =============================================

function isEmpty() {
  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}
//^=============================================== function check inputs are empty or not ============================================

//^=============================================== function that clear inputs ========================================================
function clearInputs() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
//^===============================================  function that clear inputs ===========================================================

//*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var userEmailLogin = document.getElementById("user_email_login");
var userPasswordLogin = document.getElementById("user_password_login");

var alertParagraph2 = document.getElementById("alert_paragraph_2");

var loginBtn = document.getElementById("login_btn");

var signupAnchor = document.getElementById("signup_anchor");

//~ ===========================================================================================================================================
function isLoginEmpty() {
  if (userEmailLogin.value == "" || userPasswordLogin.value == "") {
    return false;
  } else {
    return true;
  }
}

//~ ========================================================================================================================================

function logIn() {
  if (isLoginEmpty() == false) {
    alertParagraph2.classList.remove("d-none");
    alertParagraph2.innerHTML =
      ' <span class="text-warning">All input is required</span> <i class="fa-solid fa-circle-exclamation text-warning"></i> ';
    return false;
  }

  var email = userEmailLogin.value;
  var password = userPasswordLogin.value;
  for (var i = 0; i < usersList.length; i++) {
    if (
      usersList[i].email.toLowerCase() == email.toLowerCase() &&
      usersList[i].password == password
    ) {
      localStorage.setItem("sessionUserName", usersList[i].name);
      alertParagraph2.classList.remove("d-none");
      alertParagraph2.innerHTML =
        ' <span class="text-success">Loged in </span> ';
      window.location = "./home.html";
    } else {
      alertParagraph2.classList.remove("d-none");
      alertParagraph2.innerHTML =
        ' <span class="text-danger">incorrect email or password</span> <i class="fa-solid fa-circle-xmark text-danger"></i> ';
    }
  }
}
//*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var userNameHome = localStorage.getItem("sessionUserName");
var welcome = document.getElementById("hi_container");
// console.log(userNameHome);
if (userNameHome) {
  welcome.innerHTML = `<span class = "fs-1">Welcome , ${userNameHome} </span>`;
}

//& logout function =================================================================================================
function logout() {
  localStorage.removeItem("sessionUserName");
  window.location = "./index.html";
}
//& logout function ============================================================================================

// ?=================================== (validation) ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var nameAlert = document.getElementById("nameAlert");
var emailAlert = document.getElementById("emailAlert");
var passwordAlert = document.getElementById("passwordAlert");

function nameValidation() {
  var text = userName.value;
  var nameRegex = /^[a-z]{4,8}[0-9]{2,3}$/;
  if (nameRegex.test(text) == true) {
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");

    return false;
  }
}

function emailValidation() {
  var text = userEmail.value;
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(text) == true) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
    return true;
  } else {
    userEmail.classList.remove("is-valid");
    userEmail.classList.add("is-invalid");
    emailAlert.classList.remove("d-none");
    return false;
  }
}

function passwordValidation() {
  var text = userPassword.value;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (passwordRegex.test(text) == true) {
    userPassword.classList.add("is-valid");
    userPassword.classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
    return true;
  } else {
    userPassword.classList.remove("is-valid");
    userPassword.classList.add("is-invalid");
    passwordAlert.classList.remove("d-none");
    return false;
  }
}

// ?===================================  (validation) ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
