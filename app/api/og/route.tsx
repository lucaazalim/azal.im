import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") || "Luca Azalim").slice(0, 100);
  const description = (searchParams.get("description") || "").slice(0, 200);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "100px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {title}
          </h1>
          <span
            style={{
              fontSize: "1.5rem",
              color: "#ff6f00",
            }}
          >
            {description}
          </span>
        </div>
      </div>
    ),
  );
}
