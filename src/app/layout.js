import "./globals.css";

export const metadata = {
  title: "The Basement Talk Podcast | Prime’s House",
  description:
    "The Basement Talk Podcast — a Prime’s House show. Live on YouTube. Listen on Spotify, Apple, Amazon, iHeart, and more.",
  metadataBase: new URL("https://basementtalk.primeshouse.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          background: "#070A16",
          color: "#E9ECFF",
        }}
      >
        {children}
      </body>
    </html>
  );
}
