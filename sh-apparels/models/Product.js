import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description:{
        type: String,
        required: [true, 'Product description is required'],
    },
    slug:{
        type: String,
        required: [true, 'Product slug is required'],
        unique: true,
    },

    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    images: {
        type: [String],
        required: [true, 'Product image is required'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
    },

}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

Product.findById = async function (productId) {
  try {
    return await this.findOne({ _id: productId });
  } catch (error) {
    throw new Error('Error fetching product:', error);
  }
};

// Function to update a product by its _id
Product.updateStockById = async function (productId, newStockValue) {
  try {
    return await this.findByIdAndUpdate(productId, { stock: newStockValue }, { new: true });
  } catch (error) {
    throw new Error('Error updating product:', error);
  }
};

// Function to delete a product by its _id
Product.deleteProductById = async function (productId) {
  try {
    return await this.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error('Error deleting product:', error);
  }
};


export default Product;

