function doStartUpConfig() {
  checkUserLogin();
  //   createTable();
  getEmpData();
}

function checkUserLogin() {
  const userLoggedIn = sessionStorage.getItem("userLogged");
  console.log(userLoggedIn);
  if (userLoggedIn !== "logged") {
    window.location.replace("./login.html");
  }
}
const empFromLocalStorage = localStorage.getItem("employeesArr");
let employeesArr = JSON.parse(empFromLocalStorage);

const prjFromLocalStorage = localStorage.getItem("projectsArr");
let projectsArr = prjFromLocalStorage ? JSON.parse(prjFromLocalStorage) : [];

let empIndex;
function getEmpData() {
  const searchArr = window.location.search.split("=");
  empIndex = searchArr[1];
  //   console.log(empIndex);
  console.log(employeesArr[empIndex]);
  document.getElementById("emp_name").innerText = employeesArr[empIndex].name;
  createSelect();

  document.getElementById("emp_age").innerText = employeesArr[empIndex].age;
  document.getElementById("emp_phone_no").innerText =
    employeesArr[empIndex].phone;

  document
    .getElementById("emp_phone_no")
    .setAttribute("href", "tel:" + employeesArr[empIndex].phone);
  document
    .getElementById("emp_email_content")
    .setAttribute("href", "mailto:" + employeesArr[empIndex].email);

  document.getElementById("emp_email_content").innerText =
    employeesArr[empIndex].email;

  let img = document
    .getElementById("img_emp")
    .setAttribute("src", employeesArr[empIndex].image);
  if (!img) {
    document.getElementById("img_emp").setAttribute("src", "./images/user.png");
  }
}

function createSelect() {
  let selectStr = `<option value="0">No Project</option>`;
  projectsArr.forEach((project) => {
    const flag =
      employeesArr[empIndex].project === project.name ? "selected" : "";
    selectStr += `<option value="${project.name}" ${flag}>${project.name}</option>`;
  });

  document.getElementById("selectProject").innerHTML = selectStr;
}

function saveEmpProject() {
  const prj_selected = document.getElementById("selectProject").value;

  projectsArr.forEach((project, i) => {
    if (
      employeesArr[empIndex].project !== null &&
      employeesArr[empIndex].project === project.name
    ) {
      if (projectsArr[i].employees > 0) {
        projectsArr[i].employees--;
      }
    }
    if (prj_selected === project.name) {
      projectsArr[i].employees++;
    }
  });
  localStorage.setItem("projectsArr", JSON.stringify(projectsArr));

  employeesArr[empIndex].project = prj_selected === "0" ? null : prj_selected;
  localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  // console.log(prj_selected);
}
