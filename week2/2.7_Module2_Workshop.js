function Employee(id, firstName, lastName, gender, age, position){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;

    this.logFullName = function(){
        let fullName = this.firstName + " " + this.lastName;
        console.log("Full name:" + fullName)
    }
}

function Sale(staffId, item, price, date){
    this.staffId = staffId;
    this.item = item;
    this.price = price;
    this.date = date;
}

const jonnaBate = new Employee(
  30,
  "Joanna",
  "Bates",
  "Female",
  42,
  "Salesperson"
);

const gamingPCSale = new Sale(30, "Gaming PC", 1700, "01-11-2023");

console.log(jonnaBate.age);
console.log(jonnaBate.position);
console.log(`${jonnaBate.firstName} ${jonnaBate.lastName}`);

console.log(gamingPCSale.item);
console.log(gamingPCSale.price);

const monitorSale = new Sale(30, "Monitor", 1100, "10-11-2023" );
const sales = [gamingPCSale, monitorSale];

console.log(sales[1].price);
jonnaBate.logFullName();
