import GoogleStore from "../../../public/icons/google.svg";
import AppStore from "../../../public/icons/appStore.svg";
import Phone from "../../../public/icons/phone.svg";
import Image from "next/image";

export default function Application() {
  return (
    <div className="flex items-center my-[100px] justify-between flex-wrap gap-8">
      <div>
        <h3 className="text-[#191414] text-[32px] sm:text-[64px] font-bold max-w-[553px] mb-[50px]">
          Скачайте <span className="text-mainColor">приложение</span> и получите
          <span className="text-mainColor"> больше возможностей </span>
        </h3>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8">
          <Image src={GoogleStore} width={183} height={60} alt="store" />
          <Image src={AppStore} width={183} height={60} alt="store" />
        </div>
      </div>
      <div>
        <Image src={Phone} width={610} height={403} alt="phone" />
      </div>
    </div>
  );
}
