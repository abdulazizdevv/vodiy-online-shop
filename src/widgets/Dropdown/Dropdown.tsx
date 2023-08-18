import Image from "next/image";
import profileImg from "../../../public/images/sale.png";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { RxExit } from "react-icons/rx";

import "../Dropdown/dropdown.css";

const Dropdown = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(true);
    }
  }, []);

  const removeLocalStorage = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <>
      {token ? (
        <div>
          <div className="flex gap-2">
            <div>
              <Image
                className="rounded-[50%]"
                src={profileImg}
                width={54}
                height={54}
                alt="profile"
              />
            </div>
            <div>
              <p className="font-semibold text-mainColor">Одилов Кадыр</p>
              <p className="font-semibold">+998 (99) 897 45 04</p>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="/cart"
              className="flex gap-2 items-center hover:bg-[#E3F3E9] rounded-md p-2"
            >
              <AiOutlineShoppingCart size={30} />
              <p className="font-semibold">Cart</p>
            </Link>
            <Link
              href="/like"
              className="flex gap-2 items-center hover:bg-[#E3F3E9] rounded-md p-2"
            >
              <AiOutlineHeart size={30} />
              <p className="font-semibold">Favorites</p>
            </Link>

            <button
              className="bg-mainColor flex p-3 gap-3 mt-9 w-full rounded-md"
              onClick={removeLocalStorage}
              type="submit"
            >
              <RxExit size={24} color={"white"} />
              <p className="text-white">Exit</p>
            </button>
          </div>
        </div>
      ) : (
        "Not found"
      )}
    </>
  );
};
export default Dropdown;

//  <div>
// <div className="flex gap-2">
//   <div>
//     <Image
//       className="rounded-[50%]"
//       src={profileImg}
//       width={54}
//       height={54}
//       alt="profile"
//     />
//   </div>
//   <div>
//     <p className="font-semibold text-mainColor">Одилов Кадыр</p>
//     <p className="font-semibold">+998 (99) 897 45 04</p>
//   </div>
// </div>
// <div className="mt-5">
//   <Link
//     href="/cart"
//     className="flex gap-2 items-center hover:bg-[#E3F3E9] rounded-md p-2"
//   >
//     <AiOutlineShoppingCart size={30} />
//     <p className="font-semibold">Cart</p>
//   </Link>
//   <Link
//     href="/like"
//     className="flex gap-2 items-center hover:bg-[#E3F3E9] rounded-md p-2"
//   >
//     <AiOutlineHeart size={30} />
//     <p className="font-semibold">Favorites</p>
//   </Link>

//   <button
//     className="bg-mainColor flex p-3 gap-3 mt-9 w-full rounded-md"
//     onClick={removeLocalstorage}
//     type="submit"
//   >
//     <RxExit size={24} color={"white"} />
//     <p className="text-white">Exit</p>
//   </button>
// </div>
// </div>
