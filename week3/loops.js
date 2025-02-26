const employeesList = `[{
    "id":1,
    "firstName":"John",
    "lastName":"Smith",
    "gender":"Male",
    "age":23,
    "position":"Manager"
},
{
    "id":2,
    "firstName":"Mary",
    "lastName":"Sue",
    "gender":"Female",
    "age":32,
    "position":"Salesperson"
},
{
    "id":3,
    "firstName":"Fred",
    "lastName":"Jones",
    "gender":"Non-Binary",
    "age":54,
    "position":"Salesperson"
},
{
    "id":4,
    "firstName":"Jane",
    "lastName":"Doe",
    "gender":"Female",
    "age":41,
    "position":"Accountant"
},
{
    "id":5,
    "firstName":"Joe",
    "lastName":"Bloggs",
    "gender":"Male",
    "age":65,
    "position":"IT Administrator"
}]`;

const salesList = `[{
    "staffId":1,
    "item":"Wi-Fi Adapter",
    "price":40.00,
    "date":"01-09-2022"
},
{
    "staffId":1,
    "item":"Wi-Fi Adapter",
    "price":40.00,
    "date":"03-09-2022"
},
{
    "staffId":1,
    "item":"USB Cable",
    "price":5.00,
    "date":"03-09-2022"
},
{
    "staffId":1,
    "item":"Thermal Paste",
    "price":7.50,
    "date":"05-09-2022"
},
{
    "staffId":1,
    "item":"Wi-Fi Adapater",
    "price":40.00,
    "date":"07-09-2022"
},
{
    "staffId":2,
    "item":"USB Stick",
    "price":10.99,
    "date":"06-09-2022"
},
{
    "staffId":3,
    "item":"Pre-built PC",
    "price":1999.95,
    "date":"02-09-2022"
},
{
    "staffId":3,
    "item":"USB Cable",
    "price":5.00,
    "date":"02-09-2022"
},
{
    "staffId":3,
    "item":"HDMI Cable",
    "price":15.45,
    "date":"02-09-2022"
}]`;

const employees = JSON.parse(employeesList);
// console.log(employees);

const sales = JSON.parse(salesList);
// console.log(sales);

// console.log(sales[0].price);
const calculateTotalSales = function (sales) {
  totalSale = 0;
  for (let i= 0; i < sales.length; i++) {
    totalSale += sales[i].price
  }
  return totalSale
}

// console.log(calculateTotalSales(sales));

const findEmployeeById = function(employees, employeeId) {
  for(let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    if(employee.id === employeeId) {
      return console.log(`${employee.firstName} ${employee.lastName}`)
    } 
}
return console.log(`No employee found`);
};



// findEmployeeById(employees, 3);
// findEmployeeById(employees, 10);

const matchedSales = [];

for (let i = 0; i < sales.length; i++) {
  const sale = sales[i];
  const employee = employees.find((emp) => emp.id === sale.staffId);

  if (employee) {
    matchedSales.push({
      staffId: sale.staffId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      item: sale.item,
      price: sale.price,
    });
  }
}

const totalSalesByStaff = {};
const highSalesStaff = [];

matchedSales.forEach((sale) => {
  if (totalSalesByStaff[sale.staffId]) {
    totalSalesByStaff[sale.staffId] += sale.price;
  } else {
    totalSalesByStaff[sale.staffId] = sale.price;
  }

});

// console.log(matchedSales);
// console.log(totalSalesByStaff)

for (const staffId in totalSalesByStaff) {
  if (totalSalesByStaff[staffId] > 500) {
    const employee = employees.find((emp) => emp.id == staffId);
    if (employee) {
      highSalesStaff.push(`${employee.firstName} ${employee.lastName}`);
    }
  }
}

console.log(highSalesStaff);
