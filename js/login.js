function checkUserPass() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "Marius1" && pass === "xyzw") {
    // const userLoggedIn = sessionStorage.setItem("");
    document.getElementById("success_msg").style.display = "block";
    document.getElementById("error_msg").style.display = "none";

    sessionStorage.setItem("userLogged", "logged");
    window.location.replace("./index.html");
  } else {
    document.getElementById("success_msg").style.display = "none";
    document.getElementById("error_msg").style.display = "block";
  }
}

function checkLoggedInUser() {
  const userLoggedIn = sessionStorage.getItem("userLogged");
  //   console.log(userLoggedIn);
  if (userLoggedIn === "logged") {
    window.location.replace("./index.html");
  }
}
