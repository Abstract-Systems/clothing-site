import connectDB from "@/libs/connectDB";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    orderNo,
    fullName,
    email,
    address,
    phoneNo,
    Products,
    ProductName,
    ProductQuantity,
    totalAmount,
    status,
  } = await request.json();
  await connectDB();
  try {
    Order.create({
      orderNo,
      fullName,
      email,
      address,
      phoneNo,
      Products,
      ProductName,
      ProductQuantity,
      totalAmount,
      status,
    });
  } catch (error) {
    return NextResponse.error(error);
  }
  return NextResponse.json({ message: "Order created successfully" });
}
export async function GET() {
  await connectDB();
  const orders = await Order.find({});
  return NextResponse.json(orders);
}
