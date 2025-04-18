// app/api/user/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { matricNumber } = await req.json();

  if (!matricNumber) {
    return NextResponse.json({ success: false, message: "Matric number required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("election");
  const users = db.collection("users");

  const user = await users.findOne({ matricNumber });

  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  const { fullName, department } = user;

  return NextResponse.json({
    success: true,
    user: { fullName, department, matricNumber },
  });
}
