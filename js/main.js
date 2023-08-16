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

let employeesArr = [
  {
    name: "Alex",
    age: 27,
    project: null,
    birthDate: "1996-01-10",
    hired: "2020-10-05",
    phone: "0722112233",
    email: "alex@alex.ro",
  },
  {
    name: "Andreea",
    age: 25,
    project: null,
    birthDate: "1998-01-10",
    hired: "2021-08-21",
    phone: "07222222",
    email: "mada@mada.ro",
  },
  {
    name: "Radu",
    age: 29,
    project: null,
    birthDate: "1994-01-10",
    hired: "2022-10-03",
    phone: "0722113333",
    email: "mada@mada.ro",
  },
];

function createTable() {
  const table = document.getElementById("employees_table");
  let tableString = `<tr>
  <th>No.</th>
  <th>Name:</th>
  <th>Age:</th>
  <th>Project:</th>
  <th>Birth Date:</th>
  <th>Hired at:</th>
  <th>Phone:</th>
  <th>Email:</th>
</tr>`;
  employeesArr.forEach((employee, i) => {
    tableString += createRow(employee, i);
  });
  table.innerHTML = tableString;
  // table.innerHTML = createTableRow();
}

function createRow(employee, i) {
  const rowIndex = i + 1;
  let projectRes = !employee.project ? "-" : employee.project;
  let rowStr = "<tr>";
  rowStr += "<td>" + rowIndex + "</td>";
  rowStr += "<td>" + employee.name + "</td>";
  rowStr += "<td>" + employee.age + "</td>";
  rowStr += "<td>" + projectRes + "</td>";
  rowStr += "<td>" + employee.birthDate + "</td>";
  rowStr += "<td>" + employee.hired + "</td>";
  rowStr += "<td>" + employee.phone + "</td>";
  rowStr += "<td>" + employee.email + "</td>";
  rowStr += "</tr>";
  return rowStr;
}

function displayAddForm() {
  document.getElementById("add_form_container").style.display = "block";
  document.getElementById("add_container").style.display = "none";
}

function cancelAddForm() {
  const userConfirm = confirm(
    "Are you sure you want to cancel adding a new user?"
  );
  console.log(userConfirm);

  if (userConfirm) {
    document.getElementById("add_form").reset();
    document.getElementById("add_form_container").style.display = "none";
    document.getElementById("add_container").style.display = "block";
  }
}

function addNewEmp() {
  console.log("adding .....");
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
