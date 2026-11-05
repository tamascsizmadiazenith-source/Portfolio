import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const folderPath = searchParams.get("path");

  if (!folderPath) {
    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 }
    );
  }

  try {
    // Security: only allow accessing public/photos paths
    const fullPath = path.join(process.cwd(), "public", folderPath);
    const publicDir = path.join(process.cwd(), "public");

    // Ensure the path is within public directory
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: "Folder not found" },
        { status: 404 }
      );
    }

    const files = fs.readdirSync(fullPath);
    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .sort()
      .map((file) => `/photos${folderPath}/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json(
      { error: "Failed to list images" },
      { status: 500 }
    );
  }
}
