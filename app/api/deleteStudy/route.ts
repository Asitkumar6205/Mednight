import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { studyId } = await req.json(); // Get Study ID from request body

    if (!studyId) {
      return NextResponse.json({ message: "Study ID is required" }, { status: 400 });
    }

    const auth = "Basic " + Buffer.from("admin:admin").toString("base64");

    const response = await fetch(`http://localhost:8042/studies/${studyId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ message: `Failed to delete study: ${errorText}` }, { status: response.status });
    }

    return NextResponse.json({ message: "Study deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting study:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}