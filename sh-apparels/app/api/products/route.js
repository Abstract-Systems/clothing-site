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


