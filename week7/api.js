const { get } = require("http");

async function getData(url) {
  // const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

getData("https://fakestoreapi.com/products").then((products) =>
  console.log(products)
);
getData("https://fakestoreapi.com/products").then((products) =>
  console.log(products.splice(0, 10))
);
getData("https://fakestoreapi.com/products/4").then((products) =>
  console.log(products)
);
getData("https://fakestoreapi.com/products").then((products) => {
  const category = products.map((product) => product.category);
  console.log(category);
});
