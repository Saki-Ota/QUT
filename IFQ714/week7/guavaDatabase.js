const sqlite3 = require("sqlite3");

// I have copied in some of the data here. You could do the same or alternatively read the data from the txt files.
const employees = JSON.parse(
  `[{"id":1,"firstName":"John","lastName":"Smith","gender":"Male","age":23,"position":"Manager"},{"id":2,"firstName":"Mary","lastName":"Sue","gender":"Female","age":32,"position":"Salesperson"}]`
);

const sales = JSON.parse(
  `[{"staffId":1,"item":"Wi-Fi Adapter","price":40.00,"date":"01-09-2022"},{"staffId":1,"item":"Wi-Fi Adapter","price":40.00,"date":"03-09-2022"}]`
);

const db = new sqlite3.Database("guavaDatabase.db");

// Iterate over the employees array and insert the data
employees.forEach((employee) => {
  db.run(
    `INSERT INTO Employees VALUES (${employee.id}, '${employee.firstName}', '${employee.lastName}', '${employee.gender}', ${employee.age}, '${employee.position}');`
  );
});

// Iterate over the sales array and insert the data. Explicity specify the columns we wish to insert data into so that sqlite can handle the auto-incrementing id column for us
sales.forEach((sale) => {
  db.run(
    `INSERT INTO Sales (staffId, item, price, date) VALUES (${sale.staffId}, '${sale.item}', ${sale.price}, '${sale.date}');`
  );
});

db.close();
