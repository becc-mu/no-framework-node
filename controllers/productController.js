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
// Route GET /api/product/:id
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

// Update a product
// Route PUT /api/product/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const body = await getPostData(req);

      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };

      const updtProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "applictation/json" });
      return res.end(JSON.stringify(updtProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete a product
// Route DELETE /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not Found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
