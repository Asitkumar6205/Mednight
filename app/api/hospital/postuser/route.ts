import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Define schema validation for user submission
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  isDefault: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    console.log("Received Data:", body); // Debugging line

    // Validate request data
    const parsedData = userSchema.safeParse(body);
    if (!parsedData.success) {
      console.error("Validation Error:", parsedData.error.format());
      return NextResponse.json(
        { message: "Invalid input data", errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, isDefault } = parsedData.data;

    // Save user to the database (Check if `db.hospital` is correct)
    const newUser = await db.hospital.create({
      data: {
        name,
        email,
        phone,
        isDefault: isDefault || false, // Default to false if not provided
      },
    });

    console.log("User created:", newUser);

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
