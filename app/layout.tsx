import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "../styles/globals.css";
import { ApolloWrapper } from "../lib/ApolloWrapper";
import Image from "next/legacy/image";

const inter = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Star Wars Character Encyclopedia",
  description: "Find your favourite character",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <main className="flex flex-col items-center justify-between md:px-24 px-4 py-6 gap-5">
            <Image
              src={"/svg/logo.svg"}
              alt={"Star Wars logo"}
              width={100}
              height={50}
            />
            <div className="md:w-[630px] max-w-[630px] mt-5 sm:mt-12 flex flex-col items-center justify-between">
              {children}
            </div>
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
