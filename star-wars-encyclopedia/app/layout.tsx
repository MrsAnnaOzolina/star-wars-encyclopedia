import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "../styles/globals.css";
import { ApolloWrapper } from "./ApolloWrapper";
import Image from "next/legacy/image";


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
      <ApolloWrapper>
        <main className="flex flex-col items-center justify-between md:px-24 py-6 gap-[20px]">
          <Image src={"/svg/logo.svg"} alt={"Star Wars logo"} width={100} height={50} />
          <div className="w-[630px] mt-12">
            {children}
          </div>
        </main>
      </ApolloWrapper>
    </body>
  </html>
  );
}
