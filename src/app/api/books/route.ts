import { NextResponse } from "next/server";
import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";
import { BookSearchResponse } from "@/types/book";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const type = searchParams.get("type") || "all";

  try {
    const searchParams: Record<string, string> = {
      q: query,
      page: page,
      limit: "12",
    };

    // Add specific search field based on type
    if (type !== "all") {
      searchParams[type === "author" ? "author" : type] = query;
    }

    const response = await axios.get<BookSearchResponse>(
      `${API_BASE_URL}/search.json`,
      { params: searchParams }
    );

    return NextResponse.json(response.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
