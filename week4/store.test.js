const { calculateTotalSales, findEmployeeById } = require("./store");

// test("get username from Key: <XYZZAE,Hogan>", () => {
//   expect(db.getUsername("XYZZAE")).toBe("Hogan");
// }); 

const sales = [
  {
    staffId: 1,
    item: "Wi-Fi Adapter",
    price: 40.0,
    date: "01-09-2022",
  },
  {
    staffId: 1,
    item: "Wi-Fi Adapter",
    price: 40.0,
    date: "03-09-2022",
  },
  {
    staffId: 1,
    item: "USB Cable",
    price: 5.0,
    date: "03-09-2022",
  },
  {
    staffId: 1,
    item: "Thermal Paste",
    price: 7.5,
    date: "05-09-2022",
  },
  {
    staffId: 1,
    item: "Wi-Fi Adapater",
    price: 40.0,
    date: "07-09-2022",
  },
  {
    staffId: 2,
    item: "USB Stick",
    price: 10.99,
    date: "06-09-2022",
  },
  {
    staffId: 3,
    item: "Pre-built PC",
    price: 1999.95,
    date: "02-09-2022",
  },
  {
    staffId: 3,
    item: "USB Cable",
    price: 5.0,
    date: "02-09-2022",
  },
  {
    staffId: 3,
    item: "HDMI Cable",
    price: 15.45,
    date: "02-09-2022",
  },
];

const employees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    gender: "Male",
    age: 23,
    position: "Manager",
  },
  {
    id: 2,
    firstName: "Mary",
    lastName: "Sue",
    gender: "Female",
    age: 32,
    position: "Salesperson",
  },
];


test('add all sales values from sales array', () => {
    expect(calculateTotalSales(sales)).toBe(2163.89);
})

test('Find an employee that matches the given employee ID', () => {
    expect(findEmployeeById(employees, 1)).toBe("John Smith");
})

test('If the given employee ID does not match with any employees in the list, shows a message', () => {
    expect(findEmployeeById(employees, 10)).toBe('No employee found')
})
