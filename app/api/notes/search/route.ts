import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

// SEARCH notes by title
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const notes = await Note.find({
      userId: (session.user as any).id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search notes" },
      { status: 500 }
    );
  }
}
