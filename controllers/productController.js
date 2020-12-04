const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// Gets all products
// Route /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// Gets a single product
// Route /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// Create a product
// Route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const product = { name, description, price };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "applictation/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
