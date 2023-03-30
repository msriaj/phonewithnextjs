"use client";
import { APP_NAME } from "@/config";
import Head from "next/head";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main className="bg-[#F2F4F8] ">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <footer className="py-2 bg-[#091621] text-center text-white">
        <p>
          {" "}
          {APP_NAME} &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
export default Layout;
