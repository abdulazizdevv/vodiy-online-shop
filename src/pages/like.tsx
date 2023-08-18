import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

interface MapData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
}

export default function Like() {
  const [likes, setLikes] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    let likeIds: any = localStorage.getItem("likeId");
    if (likeIds) {
      setLikes(JSON.parse(likeIds));
    }
  }, []);

  useEffect(() => {
    const storedProductIds = JSON.parse(
      localStorage.getItem("selectedProductIds") || "[]"
    );
    setSelectedProductIds(storedProductIds);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = likes.map((i: any) =>
        fetch(`https://fakestoreapi.com/products/${i}`)
          .then((res) => res.json())
          .then((json) => json)
          .catch((err) => console.log(err))
      );
      try {
        const results = await Promise.all(fetchPromises);
        setData(results);
      } catch (err) {
        console.log(err);
      }
    };

    if (likes.length > 0) {
      fetchData();
    }
  }, [likes]);

  const singleProduct = (evt: any) => {
    localStorage.setItem("singleId", JSON.stringify(evt));
  };

  let allCartId;

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

  const deleteLike = (id: number) => {
    const updatedLikes = likes.filter((likeId: number) => likeId !== id);
    setLikes(updatedLikes);
    localStorage.setItem("likeId", JSON.stringify(updatedLikes));
    localStorage.setItem("selectedLikeIds", JSON.stringify(updatedLikes));
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
  return (
    <>
      <div>
        <div className="my-5 mb-6 flex items-center ">
          <Link href="/" className="text-[#191414] text-[20px] font-semibold">
            Home /
          </Link>
          <p className="capitalize text-grey text-[20px]">Like</p>
        </div>
        {likes.length !== 0 ? (
          <div className="flex sm:gap-16  flex-wrap justify-center md:justify-start">
            {data.map((el: MapData) => {
              const isSelected = selectedProductIds.includes(el.id);

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
                      className={`  sm:px-2 sm:py-3 rounded-md flex items-center gap-3 ${
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
                      className="bg-mainColor text-white p-2 sm:px-4 sm:py-3  rounded-md"
                      onClick={() => deleteLike(el.id)}
                    >
                      <AiOutlineHeart size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="text-center font-semibold text-[25px]">
            Product not found
          </h1>
        )}
      </div>
    </>
  );
}
