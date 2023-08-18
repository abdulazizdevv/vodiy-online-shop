import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { PiCameraRotate } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";

import "../Dropdown/dropdown.css";
import Categories from "pages/product";
import Offcanvas from "widgets/offcanvas";
import { Modal } from "widgets/Modal/Modal";
import Dropdown from "widgets/Dropdown/Dropdown";
import Logo from "../../../public/icons/logo.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [likeId, setLikeId] = useState([]);
  const [countLike, setCountLikeId] = useState(0);
  const [countCart, setCountCartId] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    let cartIds: any = localStorage.getItem("cartId");
    if (cartIds) {
      setCartId(JSON.parse(cartIds));
    }
  }, []);

  useEffect(() => {
    let likeIds: any = localStorage.getItem("likeId");
    if (likeIds) {
      setLikeId(JSON.parse(likeIds));
    }
  }, []);

  useEffect(() => {
    setCountLikeId(likeId?.length);
    setCountCartId(cartId?.length);
  }, [cartId, likeId]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const handleSearch = (event: any) => {
    const value = event.target.value;
    const results: any = data.filter((product: any) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log(data);

    setSearchResults(results);
    setShowSuggestions(true);
  };

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
          location.reload();
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
  const handleClose = () => {
    setShowSuggestions(false);
  };

  const singleProduct = (evt: any) => {
    localStorage.setItem("singleId", JSON.stringify(evt));
  };

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  // console.log(searchResults);

  return (
    <>
      <div className="py-5 flex items-center justify-between">
        <Link href="/" className="hidden sm:flex">
          <Image src={Logo} width={140} height={50} alt="logo" />
        </Link>
        <div className="sm:w-3/5">
          <div className="flex gap-2 items-center rounded-md bg-mainColor p-1">
            <div className="w-full flex justify-between gap-3 items-center bg-white">
              <input
                className="p-2 outline-none w-full"
                placeholder="Search..."
                type="search"
                onChange={(event) => {
                  handleSearch(event);
                  const value = event.target.value.trim();
                  setShowSuggestions(value !== "");
                }}
              />

              <div className="flex gap-3 me-3">
                <AiOutlineSearch size={25} color={"#898787"} />
                <PiCameraRotate size={25} color={"#898787"} />
              </div>
            </div>
            <button className="text-white px-5 hidden sm:flex">Search</button>

            {/* ================== */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex sm:hidden px-3"
            >
              <FaBars size={25} color={"white"} />
            </button>
            <Offcanvas isOpen={isOpen} toggleOffcanvas={toggleOffcanvas} />
            {/* ================== */}
          </div>
          <ul className=" absolute z-10 rounded-md py-2 bg-white px-3">
            {showSuggestions &&
              searchResults.map((product: any) => (
                <li
                  key={product.id}
                  className="cursor-pointer hover:bg-slate-100"
                  onClick={() => {
                    singleProduct(product.id);
                    handleClose();
                  }}
                >
                  <Link href="/singleproduct">{product.title}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex flex-col items-center">
            <BsGlobeAmericas size={25} />
            <select name="language" className="outline-none">
              <option value="ru">Ru</option>
              <option value="uz">Uz</option>
              <option value="en">En</option>
            </select>
          </div>
          <Link href="/like">
            <button className="flex relative flex-col items-center">
              <p className="absolute right-[0px] top-[-12px] bg-mainColor rounded-[50%] px-2 text-white">
                {countLike}
              </p>
              <AiOutlineHeart size={28} />
              <p>Favorites</p>
            </button>
          </Link>
          <Link href="/cart">
            <button className="flex relative flex-col items-center">
              <p className="absolute right-[-16px] top-[-12px] bg-mainColor rounded-[50%] px-2 text-white">
                {countCart}
              </p>
              <GrCart size={28} />
              <p>Cart</p>
            </button>
          </Link>
          <div className="dropdown">
            <button
              className="flex flex-col items-center"
              onClick={() => setLoginModal(true)}
            >
              <FaRegUser size={28} />
              <p>Profile</p>
            </button>
            <div className="dropdown-content">
              <Dropdown />
            </div>
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
      <div>
        <Categories />
      </div>
    </>
  );
}

export default Navbar;
