import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";
import { sendTelegramMessage } from "./api/message";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const [cards, setCards] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState<any>("");
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const increment = (productId: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const decrement = (productId: string) => {
    if (counts[productId] > 1) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    }
  };
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(counts));
  }, [counts]);
  useEffect(() => {
    let totalPrice = 0;
    let allCount = 0;

    data.forEach((product: any) => {
      const count = counts[product.id] || 1;
      const price = product.price;
      const productPrice = count * price;
      totalPrice += productPrice;
      allCount += count;
      setTitle(product.title);
    });

    setCount(allCount);
    setPrice(totalPrice);
  }, [data, counts]);

  useEffect(() => {
    let cartIds: any = localStorage.getItem("cartId");
    if (cartIds) {
      setCards(JSON.parse(cartIds));
    }
  }, []);

  let allLikeId: any[] = [];

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = cards.map((i: any) =>
        fetch(`https://fakestoreapi.com/products/${i}`)
          .then((res) => res.json())
          .then((json) => json)
          .catch((err) => console.log(err))
      );

      try {
        let totalPrice = 0;
        const results = await Promise.all(fetchPromises);
        results.map((el: any) => (totalPrice += el.price));
        results.forEach((el: any) => {
          const count = (counts[el.id] || 1) * el.price;
          totalPrice += el.price * count;
        });

        setPrice(totalPrice);
        setData(results);
      } catch (err) {
        console.log(err);
      }
    };

    if (cards.length > 0) {
      fetchData();
    }
  }, [cards]);

  const deleteCart = (id: number) => {
    const updatedCards = cards.filter((cartId: number) => cartId !== id);
    setCards(updatedCards);
    localStorage.setItem("cartId", JSON.stringify(updatedCards));
    localStorage.setItem("selectedProductIds", JSON.stringify(updatedCards));
  };

  const sendTelegram = () => {
    const botToken = "6633867633:AAFc8HNujHnb36ISPc5XfzXO9O3rjfT8ew4";
    const chatId = "-1001848608431";
    const message = `Username: Ali\nProduct title: ${title},\nCount: ${count},\nPrice: ${price}$.`;
    sendTelegramMessage({ botToken, chatId, message })
      .then((success) => {
        if (success) {
          toast.success("Successfully Checkout");
        } else {
          toast.error("Empty");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="my-5 mb-6 flex items-center ">
        <Link href="/" className="text-[#191414] text-[20px] font-semibold">
          Home /
        </Link>
        <p className="capitalize text-grey text-[20px]">Cart</p>
      </div>
      {cards.length !== 0 ? (
        <div className="flex flex-wrap gap-10 items-start justify-between mt-[30px]">
          <div>
            {data.map((el: any) => (
              <div key={el.id}>
                <hr className="mt-3" />
                <div className="flex items-center flex-wrap justify-between gap-5 mt-5">
                  <div className="flex items-center gap-10">
                    <Image
                      className="max-w-[120px] h-[100px]"
                      src={el.image}
                      width={100}
                      height={50}
                      alt="pic"
                    />
                    <p className="max-w-[500px]">{el.title}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-10">
                      <div className="flex gap-3 items-center border border-mainColor bg-[#E3F3E9] px-5 py-1 rounded-md">
                        <button
                          className="font-semibold text-slate-400 text-[30px]"
                          onClick={() => decrement(el.id)}
                        >
                          -
                        </button>
                        <p className="text-[25px]">{counts[el.id] || 1}</p>
                        <button
                          className="font-semibold text-slate-400 text-[30px]"
                          onClick={() => increment(el.id)}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <p className="font-semibold text-[40px] max-w-[80px]">
                          {(counts[el.id] || 1) * el.price}$
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 justify-between">
                      <button
                        className="flex gap-3 items-center"
                        onClick={() => {
                          addLike(el.id);
                        }}
                      >
                        <AiOutlineHeart size={25} color={"#6faa85"} />
                        Favorites
                      </button>
                      <button
                        className="flex gap-3 items-center"
                        onClick={() => deleteCart(el.id)}
                      >
                        <PiTrash size={25} color={"#6faa85"} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 w-full xl:w-[350px] border border-black rounded-md ">
            <h4 className="font-semibold text-[25px] ">Order Details</h4>
            <div className="flex justify-between mt-5">
              <p className="font-semibold text-[18px]">Product count</p>
              <p className="font-semibold text-[18px]">{count}</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="font-bold text-[18px]">All price</p>
              <p className="font-semibold text-[18px]">{price}$</p>
            </div>
            <button
              className="bg-mainColor p-3 text-white w-full mt-3 rounded-md"
              onClick={sendTelegram}
            >
              <ToastContainer />
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center font-semibold text-[25px]">Carts empty</h1>
      )}
    </>
  );
}
