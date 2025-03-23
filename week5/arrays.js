const { employeesList, salesList, missingSalesList } = require("./lists.js");

const employees = JSON.parse(employeesList);
const sales = JSON.parse(salesList);
const missingSales = JSON.parse(missingSalesList);

employees.forEach((employee) =>
  console.log(
    `Name: ${employee.firstName} ${employee.lastName}, Age: ${employee.age}`
  )
);

sales.forEach((sale) => 
    console.log(
        `Item sold: ${sale.item}`
    )
)

const newEmployees = employees.map((employee) => {
    return {
        id: employee.id,
        fullName: `${employee.firstName} ${employee.lastName}`,
        gender: employee.gender,
        position: employee.position,
        location: 'Australia'
    }
});

console.log(newEmployees);

// From @Yaping comment on Slack
/*In JavaScript, throw is used to intentionally create an error. This will immediately stop the current execution of the function (or block of code), and jump to the catch block where the error can be handled.
in this case, throwing the error is more of a deliberate action to make sure you know that there's an issue with that particular sale.
The throw is useful when:
1.When you want to enforce a condition and make sure the program doesn't continue until the condition is fixed (e.g., missing required data).
2.When debugging or logging specific errors.
3.In cases where you want to make sure certain expectations are met before proceeding. */

const calculateTotalSales = function(sales) {
    let totalSales = 0;

    try {
        sales.forEach(sale => {
            if(sale.price === undefined ){
                throw new Error (`Missing price property in sales data for ${sale.item}`)
            }

            totalSales += sale.price
        });

        return totalSales
    } catch(error) {
        console.log(error.message);
        return 0;
    }
    
};

console.log(calculateTotalSales(missingSales));


