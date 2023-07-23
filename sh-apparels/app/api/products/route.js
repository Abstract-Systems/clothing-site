import connectDB from "@/libs/connectDB";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request){
    const {title, description, slug, price, images, category, stock} = await request.json();
    await connectDB();
    Product.create({
        title,
        description,
        slug,
        price,
        images,
        category,
        stock,
    })
    return NextResponse.json({message: "Product created successfully"})
}


export async function GET(){
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);

}
export async function DELETE(request){
    await connectDB();
    await Product.findOneAndDelete(request);
    return NextResponse.json({message: "Product deleted successfully"})
}
export async function PUT(id, updateQuery){
    await connectDB();
    await Product.findOneAndUpdate(id, updateQuery,{new: true});
    return NextResponse.json({message: "Product updated successfully"})
}



