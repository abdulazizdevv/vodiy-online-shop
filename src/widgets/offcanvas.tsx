import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";

import { Modal } from "./Modal/Modal";

interface OffcanvasProps {
  isOpen: boolean;
  toggleOffcanvas: () => void;
}

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, toggleOffcanvas }) => {
  const [loginModal, setLoginModal] = useState(false);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: evt.target[0].value,
        password: evt.target[1].value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          localStorage.setItem("token", json.token);
          toast.success("Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("No information entered", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="relative bg-white shadow-lg h-full w-64">
        <div className="flex justify-end p-2">
          <button
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={toggleOffcanvas}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-6 p-2 ">
          <div className="flex items-center gap-3 hover:bg-slate-200 w-full p-3 rounded-md">
            <BsGlobeAmericas size={25} />
            <select name="language" className="outline-none hover:bg-slate-200">
              <option value="ru">Ru</option>
              <option value="uz">Uz</option>
              <option value="en">En</option>
            </select>
          </div>
          <Link href="/like">
            <button className="flex items-center gap-3 hover:bg-slate-200 w-full p-3 rounded-md">
              <AiOutlineHeart size={28} />
              <p>Favorites</p>
            </button>
          </Link>
          <Link href="/cart">
            <button className="flex items-center gap-3 hover:bg-slate-200 w-full p-3 rounded-md">
              <GrCart size={28} />
              <p>Cart</p>
            </button>
          </Link>
          <button
            className="flex items-center gap-3 hover:bg-slate-200 w-full p-3 rounded-md"
            onClick={() => setLoginModal(true)}
          >
            <FaRegUser size={28} />
            <p>Profile</p>
          </button>
        </div>
      </div>
      <Modal
        width={"480px"}
        title={"Login"}
        modal={loginModal}
        setModal={setLoginModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Username</label>
              <input
                className="w-full p-2 border border-[grey]"
                placeholder="Username"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className="w-full p-2 border border-[grey]"
                placeholder="*****"
                type="password"
                name="phoneNumber"
                id="phone"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-mainColor p-3 mt-3 text-white w-[200px]"
              >
                <ToastContainer />
                Log In
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Offcanvas;
