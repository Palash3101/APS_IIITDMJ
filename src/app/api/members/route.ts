import { NextResponse } from "next/server";

interface ImageKitFile {
  fileId: string;
  name: string;
  url: string;
  filePath: string;
  fileType: string;
}

const IMAGEKIT_FILES_ENDPOINT = "https://api.imagekit.io/v1/files";

export async function GET(request: Request) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const folder = new URL(request.url).searchParams.get("folder");

  if (!privateKey) {
    return NextResponse.json(
      { message: "ImageKit private key is not configured." },
      { status: 500 },
    );
  }

  try {
    const imageKitUrl = new URL(IMAGEKIT_FILES_ENDPOINT);
    imageKitUrl.searchParams.set("path", `/${folder}`);
    imageKitUrl.searchParams.set("fileType", "image");

    const response = await fetch(imageKitUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "ImageKit failed to return the member images." },
        { status: response.status },
      );
    }

    const files: unknown = await response.json();

    if (!Array.isArray(files)) {
      return NextResponse.json(
        { message: "ImageKit returned an invalid file list." },
        { status: 502 },
      );
    }

    const imageFiles = files.filter(
      (file): file is ImageKitFile =>
        typeof file === "object" &&
        file !== null &&
        "name" in file &&
        typeof file.name === "string" &&
        (file.name.toLowerCase().endsWith(".jpg") ||
          file.name.toLowerCase().endsWith(".jpeg")),
    );

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error("ImageKit members API error:", error);
    return NextResponse.json(
      { message: "Unable to load member images." },
      { status: 502 },
    );
  }
}
