const fs = require("fs");
let employeesTxt = fs.readFileSync("./employees.txt", "utf8");
let salesTxt = fs.readFileSync("./sales.txt", "utf8");

const employees = JSON.parse(employeesTxt);

const newEmployeeRecords = employees.map((employee) => {
  return {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    gender: employee.gender,
    position: employee.position,
    location: "Australia",
  };
});

console.log(newEmployeeRecords);

fs.writeFileSync("newEmployeeRecords.json", JSON.stringify(newEmployeeRecords));
