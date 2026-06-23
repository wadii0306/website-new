import { NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://api.wadii.in/api";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${API_BASE}/website`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({
      success: false,
      message: "Unexpected response from Wadii API.",
    }));

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Could not reach the Wadii API. Confirm the API is online and NEXT_PUBLIC_API_URL is set on Vercel.",
      },
      { status: 502 }
    );
  }
}
