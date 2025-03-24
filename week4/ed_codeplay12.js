// Example code for testing objects.

// Objects to test with.
const testObject1 = {
  name: "Flying Scotsman",
  class: "Gresley A3",
  power: "steam",
  date: 1934,
  kmh: 161,
};
const testObject2 = {
  name: "M-497",
  class: "Modified Budd RDC-3",
  power: "jet",
  date: 1966,
  kmh: 295,
};
// Function for comparing different train speed records.
function getFastestTrain(input1, input2) {
  console.log("Entering getFastestTrain function");
  console.log(`Comparing ${input1.name} with ${input2.name}`);
  if (input1.kmh > input2.kmh) {
    console.log(
      `Returning the first train which is faster (${input1.kmh} > ${input2.kmh})`
    );
    return input1;
  } else if (input1.kmh < input2.kmh) {
    console.log(
      `Returning the second train which is faster (${input1.kmh} < ${input2.kmh})`
    );
    return input2;
  } else if (input1.kmh === input2.kmh) {
    console.log("Returning both trains since they have the same speed record");
    return [input1, input2];
  } else {
    console.log("Returning null since we couldn't make a comparison");
    return null;
  }
}

// Call the function with the test values and show the result.
console.table(getFastestTrain(testObject1, testObject2));
