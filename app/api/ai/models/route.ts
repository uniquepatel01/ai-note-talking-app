// app/api/ai/models/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_AI_API_KEY!;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
