// Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Define your product schema here, for example:
  name: { type: String, required: true },
  

  // Add more fields as needed
});

export default mongoose.model('Product', productSchema);
