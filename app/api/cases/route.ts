import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";

// Define schema validation for case submission
const caseSchema = z.object({
    fullName: z.string().min(1, "Patient name is required"),
    age: z.string().min(1, "Age is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
    physician: z.string().min(1, "Physician name is required"),
    modality: z.enum(["X_Ray", "CT", "MRI", "Ultrasound", "PET_CT"]),
    bodyPart: z.string().min(1, "Body part is required"),
    urgency: z.enum(["Routine", "Urgent", "Stat"]),
    reportType: z.enum(["Preliminary", "Final"]),
    specialInstructions: z.string().optional(),
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {  fullName,
        age,
        gender,
        phone,
        physician,
        modality,
        bodyPart,
        urgency,
        reportType,
        specialInstructions } = caseSchema.parse(body);

    // Save case to the database
    const newCase = await db.order.create({
      data: {
        fullName,
        age,
        gender,
        phone,
        physician,
        modality,
        bodyPart,
        urgency,
        reportType,
        specialInstructions
      },
    });

    return NextResponse.json(
      { case: newCase, message: "Case created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}