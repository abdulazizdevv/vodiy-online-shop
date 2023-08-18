import Navbar from "../Navbar/Navbar";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";

import { Modal } from "../Modal/Modal";
import LocationImg from "../../../public/icons/location.svg";
import modalLocation from "../../../public/icons/modalLocation.svg";
import Logo from "../../../public/icons/logo.svg";

export default function Header() {
  const [postModal, setPostModal] = useState(false);

  return (
    <div className="container mx-auto  z-10 bg-white  p-5">
      <div className="flex  justify-between">
        <Link href="/" className="flex sm:hidden">
          <Image src={Logo} width={100} height={50} alt="logo" />
        </Link>
        <div className="flex justify-between sm:hidden">
          <div className="flex gap-5 text-slate-500	">
            <button className="hover:text-mainColor">Support</button>
            <button
              onClick={() => setPostModal(true)}
              className="cursor-pointer hover:text-mainColor"
            >
              Delivery
            </button>
            <button className="hover:text-mainColor">Guarantee</button>
          </div>
        </div>
      </div>
      <div className="hidden justify-between lg:flex">
        <div className="flex gap-5 font-semibold">
          <div className="flex ">
            <Image src={LocationImg} width={16} height={16} alt="Icons" />
            <p>Ташкент</p>
          </div>
          <p>UZS</p>
        </div>
        <div className="flex gap-5 text-slate-500	">
          <button className="hover:text-mainColor">Support</button>
          <button
            onClick={() => setPostModal(true)}
            className="cursor-pointer hover:text-mainColor"
          >
            Delivery
          </button>
          <button className="hover:text-mainColor">Guarantee</button>
        </div>
      </div>
      <Modal width={""} title={""} modal={postModal} setModal={setPostModal}>
        <div className="flex flex-col lg:flex-row items-center justify-center md:p-5 ">
          <div>
            <Image
              src={modalLocation}
              width={340}
              height={328}
              alt="location"
            />
          </div>
          <div>
            <h2 className="text-[#191414] md:text-[32px] text-[20px] font-semibold">
              Вам показаны товары <br /> с доставкой в
            </h2>
            <input
              placeholder="Укажите другой регион"
              type="text"
              className="border-solid border-2 border-grey-800 rounded-md outline-none  mt-3 w-full p-1 md:p-3"
            />
            <button className="bg-mainColor text-center  w-full p-1 my-2 md:my-4 md:p-3 text-white">
              Продолжить с новым регионом
            </button>
            <Link href="/" className="text-mainColor flex justify-center">
              Выбрать в ручную
            </Link>
          </div>
        </div>
      </Modal>
      <Navbar />
    </div>
  );
}
