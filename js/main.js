function checkUserLogin() {
  const userLoggedIn = sessionStorage.getItem("userLogged");
  console.log(userLoggedIn);
  if (userLoggedIn !== "logged") {
    window.location.replace("./login.html");
  }
}
