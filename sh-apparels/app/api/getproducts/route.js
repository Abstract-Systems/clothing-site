// api/getallproducts.js

import connectDB from '../../middleware/connectDB';
import Product from '../../models/Product';



// Connect to the database before handling the request
const handler = async (req, res) => {
    try {
        // Connect to the MongoDB cluster
await connectDB();
        // taking query from the url
        const query = { };
        // Make the appropriate DB calls

    }
}

handler.get(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler;
