import { connectDB } from 'util/db'; // Update the path to your db.js file
import Product from 'util/product'; // Update the path to your Product.js file
import { NextResponse } from 'next/server';

// Connect to the MongoDB cluster
connectDB();

// Export the GET function as a named export
export async function getProducts(req, res) {
  if (req.method === 'GET') {
    try {
      // Taking query from the URL
      const query = {};

      // Make the appropriate DB calls
      const data = await Product.find(query);

      return res.json(data);
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
      return NextResponse.error('Internal Server Error', { status: 500 });
    }
  } else {
    return NextResponse.error('Method Not Allowed', { status: 405 });
  }
}

// Export the POST function as a named export
export async function postProduct(req, res) {
  if (req.method === 'POST') {
    try {
      // Assuming the incoming request has JSON data in the body
      const requestData = req.body;

      // Insert the new data into the database
      const result = await Product.create(requestData);

      // Return a success response with the inserted data
      return res.json({ success: true, insertedId: result._id });
    } catch (error) {
      console.error('Error inserting data into MongoDB:', error);
      // If there's an error, return a 500 status with an empty response
      return NextResponse.error('Internal Server Error', { status: 500 });
    }
  } else {
    return NextResponse.error('Method Not Allowed', { status: 405 });
  }
}
