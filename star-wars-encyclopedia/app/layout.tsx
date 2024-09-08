import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "../styles/globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

const inter = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Star Wars Character Encyclopedia",
  description: "Find your favourite character",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
