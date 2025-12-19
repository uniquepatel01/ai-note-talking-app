import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateTags } from "@/lib/ai";
import { z } from "zod";

const tagsSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters long"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { text } = tagsSchema.parse(body);

    const tags = await generateTags(text);

    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate tags" },
      { status: 500 }
    );
  }
}
