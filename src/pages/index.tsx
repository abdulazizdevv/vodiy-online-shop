import Image from "next/image";
import { Inter } from "next/font/google";
import { getElectronics, getJewelery, getMens, getWomen } from "shared/product";
const inter = Inter({ subsets: ["latin"] });

import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useEffect, useState } from "react";
import Link from "next/link";

import Brand from "widgets/Brands/Brand";
import HeroCarousel from "widgets/Slider/HeroSlider";
import Carousel from "widgets/Slider/Slider";

interface User {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface HomeProps {
  jewelery: any;
  mens: any;
  women: any;
  electronic: any;
}

export default function Home({ jewelery, mens, women, electronic }: HomeProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedLikeIds, setSelectedLikeIds] = useState<number[]>([]);

  useEffect(() => {
    const storedProductIds = JSON.parse(
      localStorage.getItem("selectedProductIds") || "[]"
    );
    setSelectedProductIds(storedProductIds);

    const storeLikeIds = JSON.parse(
      localStorage.getItem("selectedLikeIds") || "[]"
    );
    setSelectedLikeIds(storeLikeIds);
  }, []);

  const singleProduct = (evt: any) => {
    localStorage.setItem("singleId", JSON.stringify(evt));
  };

  let allCartId;
  let allLikeId;

  const addToCart = (evt: any) => {
    let getCartId: any = localStorage.getItem("cartId");
    if (!getCartId) {
      allCartId = [evt];
    } else {
      allCartId = JSON.parse(getCartId);
      if (!allCartId.includes(evt)) {
        allCartId.push(evt);
      }
    }
    localStorage.setItem("cartId", JSON.stringify(allCartId));
  };

  const addLike = (evt: any) => {
    let getLikeId = localStorage.getItem("likeId");
    if (!getLikeId) {
      allLikeId = [evt];
    } else {
      allLikeId = JSON.parse(getLikeId);
      if (!allLikeId.includes(evt)) {
        allLikeId.push(evt);
      }
    }
    localStorage.setItem("likeId", JSON.stringify(allLikeId));
  };

  const handleProductClick = (id: number) => {
    if (!selectedProductIds.includes(id)) {
      const updatedProductIds = [...selectedProductIds, id];
      setSelectedProductIds(updatedProductIds);
      localStorage.setItem(
        "selectedProductIds",
        JSON.stringify(updatedProductIds)
      );
    }
  };
  const handleLikeClick = (id: number) => {
    if (!selectedLikeIds.includes(id)) {
      const updatedProductIds = [...selectedLikeIds, id];
      setSelectedLikeIds(updatedProductIds);
      localStorage.setItem(
        "selectedLikeIds",
        JSON.stringify(updatedProductIds)
      );
    }
  };

  const jewelerys = jewelery.map((el: any) => {
    const isSelected = selectedProductIds.includes(el.id);
    const isSelectedLike = selectedLikeIds.includes(el.id);
    return (
      <div
        className="max-w-[210px] h-[459px]"
        key={el.id}
        onClick={() => singleProduct(el.id)}
      >
        <Link href="/singleproduct">
          <Image
            className="block h-[150px] sm:h-[242px] w-[150px] sm:w-[210px]"
            src={el.image}
            width={"210"}
            height={"242"}
            alt="card"
          />
          <h4 className="font-bold text-[20px]">{el.price} $</h4>
          <p className="my-2 text-[14px] h-[80px]">{el.title}</p>
        </Link>
        <div className="flex  sm:justify-between gap-2">
          <button
            className={`  sm:px-2 p-2 sm:py-3 rounded-md flex items-center gap-3 ${
              isSelected
                ? "text-black bg-white border border-mainColor p-0"
                : "bg-mainColor text-white"
            }`}
            onClick={() => {
              addToCart(el.id);
              handleProductClick(el.id);
            }}
          >
            <AiOutlineShoppingCart size={20} /> Add to Card
          </button>
          <button
            className={`  p-2 sm:px-4 sm:py-3  rounded-md ${
              isSelectedLike
                ? "text-black bg-white border border-mainColor"
                : "bg-mainColor text-white"
            }`}
            onClick={() => {
              addLike(el.id);
              handleLikeClick(el.id);
            }}
          >
            <AiOutlineHeart
              size={20}
              color={isSelectedLike ? "black" : "white"}
            />
          </button>
        </div>
      </div>
    );
  });
  const men = mens.map((el: any) => {
    const isSelected = selectedProductIds.includes(el.id);
    const isSelectedLike = selectedLikeIds.includes(el.id);

    return (
      <div
        className="max-w-[210px] h-[459px]"
        key={el.id}
        onClick={() => singleProduct(el.id)}
      >
        <Link href="/singleproduct">
          <Image
            className="block h-[150px] sm:h-[242px] w-[150px] sm:w-[210px]"
            src={el.image}
            width={"210"}
            height={"242"}
            alt="card"
          />
          <h4 className="font-bold text-[20px]">{el.price} $</h4>
          <p className="my-2 text-[14px] h-[80px]">{el.title}</p>
        </Link>
        <div className="flex  sm:justify-between gap-2">
          <button
            className={`  sm:px-2 p-2 sm:py-3 rounded-md flex items-center gap-3 ${
              isSelected
                ? "text-black bg-white border border-mainColor p-0"
                : "bg-mainColor text-white"
            }`}
            onClick={() => {
              addToCart(el.id);
              handleProductClick(el.id);
            }}
          >
            <AiOutlineShoppingCart size={20} /> Add to Card
          </button>
          <button
            className={` text-white p-2 sm:px-4 sm:py-3  rounded-md ${
              isSelectedLike
                ? "bg-white text-black border border-mainColor"
                : "bg-mainColor"
            }`}
            onClick={() => {
              addLike(el.id);
              handleLikeClick(el.id);
            }}
          >
            <AiOutlineHeart
              size={20}
              color={isSelectedLike ? "black" : "white"}
            />
          </button>
        </div>
      </div>
    );
  });
  const womens = women.map((el: any) => {
    const isSelected = selectedProductIds.includes(el.id);
    const isSelectedLike = selectedLikeIds.includes(el.id);

    return (
      <div
        className="max-w-[210px] h-[459px]"
        key={el.id}
        onClick={() => singleProduct(el.id)}
      >
        <Link href="/singleproduct">
          <Image
            className="block h-[150px] sm:h-[242px] w-[150px] sm:w-[210px]"
            src={el.image}
            width={"210"}
            height={"242"}
            alt="card"
          />
          <h4 className="font-bold text-[20px]">{el.price} $</h4>
          <p className="my-2 text-[14px] h-[80px]">{el.title}</p>
        </Link>
        <div className="flex  sm:justify-between gap-2">
          <button
            className={`  sm:px-2 p-2 sm:py-3 rounded-md flex items-center gap-3 ${
              isSelected
                ? "text-black bg-white border border-mainColor p-0"
                : "bg-mainColor text-white"
            }`}
            onClick={() => {
              addToCart(el.id);
              handleProductClick(el.id);
            }}
          >
            <AiOutlineShoppingCart size={20} /> Add to Card
          </button>
          <button
            className={` text-white p-2 sm:px-4 sm:py-3  rounded-md ${
              isSelectedLike
                ? "bg-white text-black border border-mainColor"
                : "bg-mainColor"
            }`}
            onClick={() => {
              addLike(el.id);
              handleLikeClick(el.id);
            }}
          >
            <AiOutlineHeart
              size={20}
              color={isSelectedLike ? "black" : "white"}
            />
          </button>
        </div>
      </div>
    );
  });
  const electronics = electronic.map((el: any) => {
    const isSelected = selectedProductIds.includes(el.id);
    const isSelectedLike = selectedLikeIds.includes(el.id);

    return (
      <div
        className="max-w-[210px] h-[459px]"
        key={el.id}
        onClick={() => singleProduct(el.id)}
      >
        <Link href="/singleproduct">
          <Image
            className="block h-[150px] sm:h-[242px] w-[150px] sm:w-[210px]"
            src={el.image}
            width={"210"}
            height={"242"}
            alt="card"
          />
          <h4 className="font-bold text-[20px]">{el.price} $</h4>
          <p className="my-2 text-[14px] h-[80px]">{el.title}</p>
        </Link>
        <div className="flex  sm:justify-between gap-2">
          <button
            className={`  sm:px-2 p-2 sm:py-3 rounded-md flex items-center gap-3 ${
              isSelected
                ? "text-black bg-white border border-mainColor p-0"
                : "bg-mainColor text-white"
            }`}
            onClick={() => {
              addToCart(el.id);
              handleProductClick(el.id);
            }}
          >
            <AiOutlineShoppingCart size={20} /> Add to Card
          </button>
          <button
            className={` text-white p-2 sm:px-4 sm:py-3  rounded-md ${
              isSelectedLike
                ? "bg-white text-black border border-mainColor"
                : "bg-mainColor"
            }`}
            onClick={() => {
              addLike(el.id);
              handleLikeClick(el.id);
            }}
          >
            <AiOutlineHeart
              size={20}
              color={isSelectedLike ? "black" : "white"}
            />
          </button>
        </div>
      </div>
    );
  });

  return (
    <main>
      <div className="mb-[100px] mt-8">
        <HeroCarousel />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-[35px] font-semibold my-5">Jewelry</h1>
        <Carousel slides={jewelerys} />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-[35px] font-semibold my-5">Mens Clothes</h1>
        <Carousel slides={men} />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-[35px] font-semibold my-5">Womens clothes</h1>
        <Carousel slides={womens} />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-[35px] font-semibold my-5">Electronics</h1>
        <Carousel slides={electronics} />
      </div>
      <div>
        <Brand />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const jewelery: User = await getJewelery();
  const mens: User = await getMens();
  const women: User = await getWomen();
  const electronic: User = await getElectronics();

  return { props: { jewelery, mens, women, electronic } };
}
