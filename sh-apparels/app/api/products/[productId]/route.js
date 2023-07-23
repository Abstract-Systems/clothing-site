import connectDB from "@/libs/connectDB";
import Product from "@/models/Product";

export default async function handler(req, res) {
  // Extract the productId from the request query
  const { productId } = req.query;

  // Handle different HTTP methods using a switch statement
  switch (req.method) {
    // Handle the PATCH request to update product stock
    case "PATCH":
      // Extract the stock from the request body
      const { stock } = req.body;
      try {
        // Connect to the database
        await connectDB();

        // Find the product by ID and update its stock
        const product = await Product.findByIdAndUpdate(
          productId,
          { stock },
          { new: true } // Return the updated product after the update
        );

        // Check if the product was found and updated successfully
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Respond with a success message
        return res.status(200).json({ message: "Product stock updated successfully" });
      } catch (error) {
        // Handle any internal server errors
        return res.status(500).json({ message: "Internal Server Error" });
      }

    // Handle the DELETE request to delete the product
    case "DELETE":
      try {
        // Connect to the database
        await connectDB();

        // Find the product by ID and delete it
        const product = await Product.findByIdAndDelete(productId);

        // Check if the product was found and deleted successfully
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Respond with a success message
        return res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        // Handle any internal server errors
        return res.status(500).json({ message: "Internal Server Error" });
      }

    default:
      // Handle requests with unsupported HTTP methods
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

