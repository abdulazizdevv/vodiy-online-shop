import React from "react";
import { data } from "./data";
import Image from "next/image";

export default function Brand() {
  return (
    <div className="my-[100px]">
      <h3 className="font-semibold text-[32px] mb-10 ">Brand</h3>
      <div className="flex flex-wrap justify-center gap-10">
        {data.map((el) => {
          return <Image src={el.img} width={100} height={65} alt="brand" key={el.id} />;
        })}
      </div>
    </div>
  );
}
