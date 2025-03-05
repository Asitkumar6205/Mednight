// pages/api/orders.ts (for Next.js App Router)
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const orders = [
    {
      id: 1,
      patientName: "John Doe",
      gender: "Male",
      study: "Brain MRI",
      modality: "MRI",
      assignedTo: "Dr. Smith",
      date: "2025-02-15",
      priority: "High",
      message: "Urgent case",
      files: ["scan1.jpg"],
      image: "/images/scan1.jpg",
    },
  ];

  res.status(200).json(orders);
}
