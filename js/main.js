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

// let employeesArr = [
//   {
//     name: "Alex",
//     age: 27,
//     project: null,
//     birthDate: "1996-01-10",
//     hired: "2020-10-05",
//     phone: "0722112233",
//     email: "alex@alex.ro",
//   },
//   {
//     name: "Madalina",
//     age: 25,
//     project: null,
//     birthDate: "1998-01-10",
//     hired: "2021-08-21",
//     phone: "0722222222",
//     email: "mada@mada.ro",
//   },
//   {
//     name: "Radu",
//     age: 29,
//     project: null,
//     birthDate: "1994-01-10",
//     hired: "2022-10-03",
//     phone: "0722113333",
//     email: "radu@radu.ro",
//   },
// ];

// let employeesArr = [];
const empFromLocalStorage = localStorage.getItem("employeesArr");
let employeesArr = empFromLocalStorage ? JSON.parse(empFromLocalStorage) : [];

sortArrayOfObjects = (arr, key) => {
  arr.sort((a, b) => {
    // return a[key] - b[key];
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

// const name_th = document.getElementById("name_th");
// name_th.addEventListener("click", sortArrayOfObjects(employeesArr, "name"));
// sortArrayOfObjects(employeesArr, "name");
const empArrClone = [...employeesArr];
empArrClone.forEach((emp, i) => {
  emp.id = i;
  i++;
});

function customSort(el) {
  const el_name = document.getElementById(el);
  if (el === "sortByName") {
    sortArrayOfObjects(employeesArr, "name");
  } else if (el === "sortByAge") {
    sortArrayOfObjects(employeesArr, "age");
  } else if (el === "sortByBirthDate") {
    sortArrayOfObjects(employeesArr, "birthDate");
  } else if (el === "sortByEmail") {
    sortArrayOfObjects(employeesArr, "email");
  } else if (el === "resetSort") {
    employeesArr = empArrClone;
    // sortArrayOfObjects(employeesArr, empArrClone);
    sortArrayOfObjects(employeesArr, "id");
  }

  createTable();
}

function select() {
  const sortVal = document.getElementById("selectSort").value;
  // console.log(sortVal);
  if (sortVal === "default") {
    employeesArr = empArrClone;
    // sortArrayOfObjects(employeesArr, empArrClone);
    sortArrayOfObjects(employeesArr, "id");
  } else if (sortVal === "selectSortName") {
    sortArrayOfObjects(employeesArr, "name");
  } else if (sortVal === "selectSortAge") {
    sortArrayOfObjects(employeesArr, "age");
  } else if (sortVal === "selectSortBirthDate") {
    sortArrayOfObjects(employeesArr, "birthDate");
  } else if (sortVal === "selectSortEmail") {
    sortArrayOfObjects(employeesArr, "email");
  }
  createTable();
}

function createTable() {
  if (employeesArr.length === 0 && employeesArr) {
    document.getElementById("no_emp_container").style.display = "block";
    document.getElementById("table_container").style.display = "none";
  } else {
    document.getElementById("no_emp_container").style.display = "none";
    document.getElementById("table_container").style.display = "block";
    const table = document.getElementById("employees_table");
    let tableString = `<tr>
  <th>No.</th>
  <th id="name_th">Name:</th>
  <th id="age_th">Age:</th>
  <th>Project:</th>
  <th>Birth Date:</th>
  <th>Hired at:</th>
  <th>Phone:</th>
  <th>Email:</th>
  <th>Actions:</th>
</tr>`;
    employeesArr.forEach((employee, i) => {
      tableString += createRow(employee, i);
    });
    table.innerHTML = tableString;
  }
}

function deleteEmp(i) {
  // console.log("index: ", i);
  if (
    confirm("Are you sure you want to delete " + employeesArr[i].name + "?")
  ) {
    // console.log("deleting...");
    employeesArr.splice(i, 1);
    localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
    createTable();
  }
}

let saveEmpIndex = 0;
function editEmp(i) {
  saveEmpIndex = i;
  displayAddForm(false);
  document.getElementById("add_button").style.display = "none";
  document.getElementById("edit_button").style.display = "inline-block";
  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    document.getElementById(key).value = employeesArr[i][key];
    validationObj[key] = true;
  });
  checkValidationObj();
  // document.getElementById("name").value = employeesArr[i].name;
  // document.getElementById("age").value = employeesArr[i].age;
  // document.getElementById("birthDate").value = employeesArr[i].birthDate;
  // document.getElementById("phone").value = employeesArr[i].phone;
  // document.getElementById("email").value = employeesArr[i].email;
}

function saveEditEmp() {
  console.log("index to save:", saveEmpIndex);
  // employeesArr[saveEmpIndex].name = document.getElementById("name").value;
  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    employeesArr[saveEmpIndex][key] = document.getElementById(key).value;
  });
  localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  createTable();
  document.getElementById("add_form_container").style.display = "none";
  document.getElementById("add_container").style.display = "block";
}

function createRow(employee, i) {
  const rowIndex = i + 1;
  let projectRes = !employee.project ? "-" : employee.project;
  let rowStr = "<tr>";
  rowStr += "<td>" + rowIndex + "</td>";
  rowStr +=
    "<td><a href='employee.html?index=" +
    i +
    "' class='emp_link'>" +
    employee.name +
    "</a></td>";
  rowStr += "<td>" + employee.age + "</td>";
  rowStr += "<td>" + projectRes + "</td>";
  rowStr += "<td>" + employee.birthDate + "</td>";
  rowStr += "<td>" + employee.hired + "</td>";
  rowStr += "<td>" + employee.phone + "</td>";
  rowStr += "<td>" + employee.email + "</td>";
  rowStr +=
    "<td><button class='editEmpButton' onclick='editEmp(" +
    i +
    ")'>Edit</button><button class='delButton' onclick='deleteEmp(" +
    i +
    ")'>Del</button></td>";
  rowStr += "</tr>";
  return rowStr;
}

function displayAddForm() {
  document.getElementById("add_form_container").style.display = "block";
  document.getElementById("add_container").style.display = "none";
  document.getElementById("add_button").style.display = "inline-block";
  document.getElementById("edit_button").style.display = "none";

  // if (resetForm) {
  //   document.getElementById("add_form").reset();
  // }

  const validationKeys = Object.keys(validationObj);
  validationKeys.forEach((key) => {
    validationObj[key] = false;
  });
  checkValidationObj();
  // let validationObj = initialValidationObj;
  // checkValidationObj();
}

function cancelAddForm() {
  const userConfirm = confirm(
    "Are you sure you want to cancel adding a new user?"
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

let initialValidationObj = {
  name: false,
  age: false,
  birthDate: false,
  phone: false,
  email: false,
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

function checkAge() {
  const age_el = document.getElementById("age");
  const age = age_el.value;
  if (age !== "" && !isNaN(age) && age >= 18 && age <= 65) {
    document.getElementById("age_err").style.display = "none";
    age_el.classList.remove("input_err");
    validationObj.age = true;
  } else {
    document.getElementById("age_err").style.display = "block";
    age_el.classList.add("input_err");
    validationObj.age = false;
  }

  checkValidationObj();
}

function checkBirthdate() {
  const bdate_el = document.getElementById("birthDate");
  const bdate = bdate_el.value;

  const pattern = /^\d{4}-\d{2}-\d{2}$/g;
  // console.log(bdate, pattern.test(bdate));

  const result = pattern.test(bdate);
  if (bdate === "" || !result) {
    document.getElementById("bdate_err").style.display = "block";
    bdate_el.classList.add("input_err");
  } else {
    document.getElementById("bdate_err").style.display = "none";
    bdate_el.classList.remove("input_err");
  }
  checkValidationObj();
}

function checkPhone() {
  const phone_el = document.getElementById("phone");
  const phone = phone_el.value;
  const pattern = /^07\d{8}$/g;

  const result = pattern.test(phone);
  if (!result) {
    document.getElementById("phone_err").style.display = "block";
    phone_el.classList.add("input_err");
  } else {
    document.getElementById("phone_err").style.display = "none";
    phone_el.classList.remove("input_err");
  }

  checkValidationObj();
}

function checkElement(element) {
  const html_el = document.getElementById(element);
  const el_value = html_el.value;
  let pattern;
  if (element === "birthDate") {
    pattern = /^\d{4}-\d{2}-\d{2}$/g;
  } else if (element === "phone") {
    pattern = /^07\d{8}$/g;
  } else if (element === "email") {
    pattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
  }

  const result = pattern.test(el_value);
  if (el_value === "" || !result) {
    document.getElementById(element + "_err").style.display = "block";
    html_el.classList.add("input_err");
    validationObj[element] = false;
  } else {
    document.getElementById(element + "_err").style.display = "none";
    html_el.classList.remove("input_err");
    validationObj[element] = true;
  }

  checkValidationObj();
}

function addNewEmp() {
  // console.log("adding .....");
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const monthToAdd = month < 10 ? "0" + month : month;

  const newEmpObj = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    birthDate: document.getElementById("birthDate").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    hired: year + "-" + monthToAdd + "-" + day,
    project: null,
    image: "./images/user.png",
  };
  // console.log(newEmpObj);
  employeesArr.push(newEmpObj);
  localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  createTable();

  clearAndHideForm();
}

// function createTableRow() {
//   let value = "";
//   employeesArr.forEach((employee, i) => {
//     i++;
//     value += `<tr>
//             <td>${i}</td>
//             <td>${employee.name}</td>
//             <td>${employee.age}</td>
//             <td>${employee.birthDate}</td>
//             <td>${employee.hired}</td>
//             <td>${employee.phone}</td>
//             <td>${employee.email}</td>
//     </tr>`;
//   });
//   return value;
// }
