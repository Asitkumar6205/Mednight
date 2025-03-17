import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const orders = await db.order.findMany(); // Fetch all orders

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch orders", error }, { status: 500 });
  } 
}

