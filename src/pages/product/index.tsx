import Link from "next/link";
import React from "react";

export default function Categories() {
  return (
    <div className="flex justify-around gap-1">
      <Link
        className="font-semibold text-[14px] md:text-[20px] hover:text-mainColor focus:text-mainColor focus:px-0.5 rounded-lg  "
        href="/product/jewelery"
      >
        Jewelery
      </Link>
      <Link
        className="font-semibold text-[14px] md:text-[20px]  hover:text-mainColor focus:text-mainColor focus:px-0.5 rounded-lg  "
        href="/product/electronics"
      >
        Electronics
      </Link>
      <Link
        className="font-semibold text-[14px] md:text-[20px]  hover:text-mainColor focus:text-mainColor focus:px-0.5 rounded-lg  "
        href="/product/men's clothing"
      >
        Men's clothing
      </Link>
      <Link
        className="font-semibold text-[14px] md:text-[20px]  hover:text-mainColor focus:text-mainColor focus:px-0.5 rounded-lg  "
        href="/product/women's clothing"
      >
        Women's clothing
      </Link>
    </div>
  );
}
