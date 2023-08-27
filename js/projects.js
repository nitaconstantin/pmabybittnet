function doStartUpConfig() {
  checkUserLogin();
  createTable();
}

function checkUserLogin() {
  const userLoggedIn = sessionStorage.getItem("userLogged");
  console.log(userLoggedIn);
  if (userLoggedIn !== "logged") {
    window.location.replace("./login.html");
  }
}

const prjFromLocalStorage = localStorage.getItem("projectsArr");
let projectsArr = prjFromLocalStorage ? JSON.parse(prjFromLocalStorage) : [];

function createTable() {
  if (projectsArr.length === 0 && projectsArr) {
    document.getElementById("no_emp_container").style.display = "block";
    document.getElementById("table_container").style.display = "none";
  } else {
    document.getElementById("no_emp_container").style.display = "none";
    document.getElementById("table_container").style.display = "block";
    const table = document.getElementById("projects_table");
    let tableString = `<tr>
  <th>No.</th>
  <th>Prj name:</th>
  <th>Start date:</th>
  <th>Duration (months):</th>
  <th>Emp needed:</th>
  <th>Emp working:</th>
  <th>Actions:</th>
  
</tr>`;
    projectsArr.forEach((project, i) => {
      tableString += createRow(project, i);
    });
    table.innerHTML = tableString;
    // table.innerHTML = createTableRow();
  }
}

function createRow(project, i) {
  const rowIndex = i + 1;
  let rowStr = "<tr>";
  rowStr += "<td>" + rowIndex + "</td>";
  rowStr += "<td>" + project.name + "</td>";
  rowStr += "<td>" + project.start_date + "</td>";
  rowStr += "<td>" + project.duration + "</td>";

  rowStr += "<td>" + project.no_pers + "</td>";
  rowStr += "<td>" + project.employees + "</td>";
  rowStr +=
    "<td><button class='editEmpButton' onclick='editPrj(" +
    i +
    ")'>Edit</button><button class='delButton' onclick='deletePrj(" +
    i +
    ")'>Del</button></td>";
  rowStr += "</tr>";
  return rowStr;
}

function displayAddForm(resetForm) {
  document.getElementById("add_form_container").style.display = "block";
  document.getElementById("add_container").style.display = "none";
  document.getElementById("add_button").style.display = "inline-block";
  document.getElementById("edit_button").style.display = "none";

  if (resetForm) {
    document.getElementById("add_form").reset();
  }

  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    validationObj[key] = false;
  });
  checkValidationObj();
}

let initialValidationObj = {
  name: false,
  start_date: false,
  duration: false,
  no_pers: false,
};

let validationObj = initialValidationObj;

function checkValidationObj() {
  let validationKeys = Object.keys(validationObj);
  let flag = true;
  validationKeys.forEach((key) => {
    if (!validationObj[key]) {
      flag = false;
    }
    if (flag) {
      document.getElementById("add_button").disabled = false;
      document.getElementById("edit_button").disabled = false;
    } else {
      document.getElementById("add_button").disabled = true;
      document.getElementById("edit_button").disabled = true;
    }
  });
}

function checkName() {
  const name_el = document.getElementById("name");
  const name = name_el.value;
  if (name === "" || name === null) {
    document.getElementById("name_err").style.display = "block";
    name_el.classList.add("input_err");
    validationObj.name = false;
  } else {
    document.getElementById("name_err").style.display = "none";
    name_el.classList.remove("input_err");
    validationObj.name = true;
  }

  checkValidationObj();
}

function checkStartDate() {
  let start_date_el = document.getElementById("start_date");
  let start_date = start_date_el.value;
  const pattern = /^\d{4}-\d{2}-\d{2}$/g;
  const result = pattern.test(start_date);

  if (start_date === "" || !result) {
    document.getElementById("start_date_err").style.display = "block";
    start_date_el.classList.add("input_err");
    validationObj["start_date"] = false;
  } else {
    document.getElementById("start_date_err").style.display = "none";
    start_date_el.classList.remove("input_err");
    validationObj["start_date"] = true;
  }
  checkValidationObj();
}

function checkElement(el) {
  const html_el = document.getElementById(el);
  const el_value = html_el.value;
  const end_range = el === "duration" ? 36 : 10;

  if (
    el_value === "" ||
    isNaN(el_value) ||
    el_value < 1 ||
    el_value > end_range
  ) {
    document.getElementById(el + "_err").style.display = "block";
    html_el.classList.add("input_err");
    validationObj[el] = false;
  } else {
    document.getElementById(el + "_err").style.display = "none";
    html_el.classList.remove("input_err");
    validationObj[el] = true;
  }
  checkValidationObj();
}

function cancelAddForm() {
  const userConfirm = confirm(
    "Are you sure you want to cancel adding a new project?"
  );
  console.log(userConfirm);

  if (userConfirm) {
    clearAndHideForm();
  }
}

function clearAndHideForm() {
  document.getElementById("add_form").reset();
  document.getElementById("add_form_container").style.display = "none";
  document.getElementById("add_container").style.display = "block";
}

function addNewProject() {
  // console.log("adding .....");

  const newPrjObj = {
    name: document.getElementById("name").value,
    start_date: document.getElementById("start_date").value,
    duration: document.getElementById("duration").value,
    no_pers: document.getElementById("no_pers").value,
    employees: 0,
  };
  // console.log(newEmpObj);
  projectsArr.push(newPrjObj);
  localStorage.setItem("projectsArr", JSON.stringify(projectsArr));
  createTable();
  clearAndHideForm();
}

function deletePrj(i) {
  // console.log("index: ", i);
  if (confirm("Are you sure you want to delete " + projectsArr[i].name + "?")) {
    // console.log("deleting...");
    projectsArr.splice(i, 1);
    localStorage.setItem("projectsArr", JSON.stringify(projectsArr));
    createTable();
  }
}

let savePrjIndex = 0;
function editPrj(i) {
  savePrjIndex = i;
  displayAddForm(false);
  document.getElementById("add_button").style.display = "none";
  document.getElementById("edit_button").style.display = "inline-block";
  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    document.getElementById(key).value = projectsArr[i][key];
    validationObj[key] = true;
  });
  checkValidationObj();
  // document.getElementById("name").value = employeesArr[i].name;
  // document.getElementById("age").value = employeesArr[i].age;
  // document.getElementById("birthDate").value = employeesArr[i].birthDate;
  // document.getElementById("phone").value = employeesArr[i].phone;
  // document.getElementById("email").value = employeesArr[i].email;
}

function saveEditProject() {
  // employeesArr[saveEmpIndex].name = document.getElementById("name").value;
  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    projectsArr[savePrjIndex][key] = document.getElementById(key).value;
  });
  localStorage.setItem("projectsArr", JSON.stringify(projectsArr));
  createTable();
  document.getElementById("add_form_container").style.display = "none";
  document.getElementById("add_container").style.display = "block";
}
