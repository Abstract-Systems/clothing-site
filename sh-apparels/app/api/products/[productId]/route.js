import connectDB from "@/libs/connectDB";
import Product from "@/models/Product";

export async function patchProductHandler(req, res) {
  const { productId } = req.query;

  // Handle the PATCH request to update product stock
  const { stock } = req.body;
  try {
    await connectDB();
    const product = await Product.findByIdAndUpdate(productId, { stock }, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product stock updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteProductHandler(req, res) {
  const { productId } = req.query;

  // Handle the DELETE request to delete the product
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
