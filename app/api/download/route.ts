import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const { url, filename, model } = await req.json();

  console.log("API ROUTE - Download");
  console.log(url);
  console.log(model);
  console.log(filename);

  let extension;

  if (model === "Haiper" || model === "AnimateDiff") {
    extension = "mp4";
  } else {
    extension = "webm";
  }

  const response = await fetch(url);

  if (!response.ok) {
    return new NextResponse("Failed to download", { status: 404 });
  }

  const blob = await response.blob();

  const file = new File([blob], `${filename}.${extension}`);

  return new NextResponse(file, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}.${extension}"`,
    },
  });
}
