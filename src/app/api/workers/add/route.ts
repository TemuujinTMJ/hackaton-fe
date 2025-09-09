import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}
