let products = require("../data/products");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    // if (process.env.NODE_ENV !== "test") {
    //   fs.writeFile(
    //     "./data/products.json",
    //     JSON.stringify(newProduct),
    //     "utf8",
    //     (error) => {
    //       if (error) {
    //         console.log(error);
    //       }
    //       console.log("Product is saved");
    //     }
    //   );
    // }
    // resolve(newProduct);
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

module.exports = {
  findAll,
  findById,
  create,
};
