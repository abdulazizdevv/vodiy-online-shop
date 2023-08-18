import Link from "next/link";
import React from "react";
import Image from "next/image";

import PlayMarket from "../../../public/icons/playmarket.svg";
import AppleStore from "../../../public/icons/apple.svg";

export default function Footer() {
  return (
    <div className="   text-[#F9F9F9]  p-5 mt-[100px]">
      <div className="flex flex-wrap gap-5 mb-4 container mx-auto">
        <Link href="/">About company</Link>
        <Link href="/">Jobs</Link>
        <Link href="/">Help</Link>
        <Link href="/">Delivery</Link>
        <Link href="/">Service centers</Link>
        <Link href="/">Payment and delivery</Link>
      </div>
      <hr />
      <div className="flex justify-between container mx-auto mt-4 mb-14">
        <p>© 2021 UZS Vodiy (Toshkent)</p>
        <div className="text-right ">
          <div className="flex justify-end gap-5 mb-4">
            <Link href="#">
              <Image src={PlayMarket} width={32} height={32} alt="market" />
            </Link>
            <Link href="#">
              <Image src={AppleStore} width={32} height={32} alt="market" />
            </Link>
          </div>
          <p className="">
            Этот сайт защищен reUZB и Google <br /> Политика конфиденциальности
            и Условия использования
          </p>
        </div>
      </div>
    </div>
  );
}
