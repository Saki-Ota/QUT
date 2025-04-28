const data = require("./NEOWISE_Dataset.json");

console.log(data)
console.log(typeof data)

const apolloNeos = [];
const amorNeos = [];
const atenNeos = [];
const phaTrueNeos = [];
const phaFalseNeos = [];

const sortedApolloNeos = [];
const sortedAmorNeos = [];
const sortedAtenNeos = [];

const sortedPhaTrueNeos = [];
const sortedPhaFalseNeos = [];

const findMatchingClass = function (data, className, emptyArray) {
  for (i = 0; i < data.length; i++) {
    let neo = data[i];
    if (neo.orbit_class === className) {
      emptyArray.push(neo);
    } else {
      console.log("no  matching class found");
    }
  }
  return emptyArray;
};

const sortPhaNeos = function (data, arry1, arry2) {
  for (i = 0; i < data.length; i++) {
    let neo = data[i];
    if (neo.pha) {
      arry1.push(neo);
    } else if (neo.pha === false) {
      arry2.push(neo);
    } else {
      return neo;
    }
  }
  return arry1;
};

const extractItems = function (classArray, itemName) {
  let itemArray = [];
  for (i = 0; i < classArray.length; i++) {
    let element = classArray[i];
    if (element[itemName]) {
      itemArray.push(element[itemName]);
    }
  }

  return itemArray;
};

const showMaximumAndMinimum = function (classArray, itemName) {
  let itemArray = extractItems(classArray, itemName);
  itemArray.sort((a, b) => (a > b ? -1 : 1));
  return console.log(
    `Maximum: ${itemArray[0]} Minimum: ${itemArray[itemArray.length - 1]}`
  );
};

const showAverage = function (classArray, itemName) {
  let itemArray = extractItems(classArray, itemName);

  let sum = 0;
  for (i = 0; i < itemArray.length; i++) {
    sum += itemArray[i];
  }

  return console.log(sum / itemArray.length);
};


// Step 3
const filterValidObjects = function (arry) {
  return arry.filter(
    (item) =>
      item.orbit_class === "Apollo" ||
      item.orbit_class === "Amor" ||
      item.orbit_class === "Aten"
  );
};

// Step 3
// Apollo class q_au_q is >= 1.01
// Aten class q_au_1 is under 1
// Aten class period_yr is under 1
const sortClasses = function (data, arry1, arry2, arry3) {
  for (let i = 0; i < data.length; i++) {
    let object = data[i];
    if (object.q_au_1 < 1 && object.period_yr < 1) {
      arry1.push(object);
    } else if (object.q_au_1 <= 1.01) {
      arry2.push(object);
    } else {
      arry3.push(object);
    }
  }

  return arry3;
};

// Step3
//to be PHA true, moid_au values would be in a range from 0.049 to 0.007
// h_mag is under 22
const checkPha = function (data, arry1, arry2) {
    for(let i = 0; i < data.length; i++){
        let object = data[i]
        if((0.049 <= object.moid_au <= 0.007) && (object.h_mag < 22)){
            arry1.push(object)
        } else {
            arry2.push(object)
        }
    }

    return arry1;
}

// Step 4
function Neos(apollo, amor, aten) {
    this.apollo = apollo;
    this.amor = amor;
    this.aten = aten;
}



// create an array of NEOs of a certain class
const basicApolloNeosArray = findMatchingClass(data, "Apollo", apolloNeos);
const basicAmorNeosArray = findMatchingClass(data, "Amor", amorNeos);
const basicAtenNeosArray = findMatchingClass(data, "Aten", atenNeos);

console.table(basicApolloNeosArray);
console.table(basicAmorNeosArray);
console.table(basicAtenNeosArray);

// find and create an array of NEOs with pha as true
sortPhaNeos(data, phaTrueNeos, phaFalseNeos);

// Apollo class each item's maximum, minum and average values
console.log("Apollo class");
showMaximumAndMinimum(apolloNeos, "h_mag");
showMaximumAndMinimum(apolloNeos, "q_au_1");
showMaximumAndMinimum(apolloNeos, "q_au_2");
showMaximumAndMinimum(apolloNeos, "period_yr");
showMaximumAndMinimum(apolloNeos, "i_deg");
showAverage(apolloNeos, "h_mag");
showAverage(apolloNeos, "q_au_1");
showAverage(apolloNeos, "q_au_2");
showAverage(apolloNeos, "period_yr");
showAverage(apolloNeos, "i_deg");


// Amor class each item's maximum, minum and average values
console.log("Amor class");
showMaximumAndMinimum(amorNeos, "h_mag");
showMaximumAndMinimum(amorNeos, "q_au_1");
showMaximumAndMinimum(amorNeos, "q_au_2");
showMaximumAndMinimum(amorNeos, "period_yr");
showMaximumAndMinimum(amorNeos, "i_deg");
showAverage(amorNeos, "h_mag");
showAverage(amorNeos, "q_au_1");
showAverage(amorNeos, "q_au_2");
showAverage(amorNeos, "period_yr");
showAverage(amorNeos, "i_deg");


// Aten class each item's maximum, minum and average values
console.log("Aten class");
showMaximumAndMinimum(atenNeos, "h_mag");
showMaximumAndMinimum(atenNeos, "q_au_1");
showMaximumAndMinimum(atenNeos, "q_au_2");
showMaximumAndMinimum(atenNeos, "period_yr");
showMaximumAndMinimum(atenNeos, "i_deg");
showAverage(atenNeos, "h_mag");
showAverage(atenNeos, "q_au_1");
showAverage(atenNeos, "q_au_2");
showAverage(atenNeos, "period_yr");
showAverage(atenNeos, "i_deg");


console.log("PHA NEOs");
showMaximumAndMinimum(phaTrueNeos, "h_mag");
showMaximumAndMinimum(phaTrueNeos, "moid_au");
showAverage(phaTrueNeos, "h_mag");
showAverage(phaTrueNeos, "moid_au");

console.log("Non PHA NEOs");
showMaximumAndMinimum(phaFalseNeos, "h_mag");
showMaximumAndMinimum(phaFalseNeos, "moid_au");
showAverage(phaFalseNeos, "h_mag");
showAverage(phaFalseNeos, "moid_au");



// Step3 
const filteredData = filterValidObjects(data);

sortClasses(filteredData, sortedAtenNeos, sortedApolloNeos, sortedAmorNeos);
checkPha(data, sortedPhaTrueNeos, sortedPhaFalseNeos)




// Step4
const newData = new Neos(sortedApolloNeos, sortedAmorNeos, sortedAtenNeos);

module.exports = {newData, findMatchingClass, sortClasses, checkPha};










