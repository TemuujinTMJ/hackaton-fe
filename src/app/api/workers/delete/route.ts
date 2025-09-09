import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
