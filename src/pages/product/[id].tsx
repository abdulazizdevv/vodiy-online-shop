"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { getPostDetails, getPostIdList } from "shared/post";

export async function getStaticPaths() {
  const paths = await getPostIdList();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const category = params.id;

  const postData = await getPostDetails(params.id);

  return {
    props: {
      category,
      postData,
    },
  };
}

export default function Post({ category, postData }: any) {
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
  const categories = postData.map((el: any) => {
    const isSelected = selectedProductIds.includes(el.id);

    return (
      <div
        className="max-w-[210px] h-[459px]"
        key={el.id}
        onClick={() => singleProduct(el.id)}
      >
        <Link href="/singleproduct">
          <Image
            className="block h-[242px] w-[150px] sm:w-[210px]"
            src={el.image}
            width={"210"}
            height={"242"}
            alt="card"
          />
          <h4 className="font-bold text-[20px]">{el.price} $</h4>
          <p className="my-2 text-[14px] h-[80px]">{el.title}</p>
        </Link>
        <div className="flex  sm:justify-between gap-2">
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
              className={` text-white p-2 sm:px-4 sm:py-3  rounded-md ${
                selectedLikeIds.includes(el.id)
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
                color={selectedLikeIds.includes(el.id) ? "black" : "white"}
              />
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="my-5 mb-6">
        <Link href="/" className="text-[#191414] text-[20px] font-semibold">
          Home /
        </Link>
        <Link href={``} className="capitalize text-grey">
          {category}
        </Link>
      </div>
      <div className=" flex flex-wrap justify-between ">
        <h1 className="w-full md:w-[25%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
          sapiente obcaecati corrupti totam sunt consequuntur alias
          necessitatibus. Minima accusamus mollitia, id eaque amet nesciunt esse
          modi voluptate enim commodi impedit nulla minus perspiciatis. Facere
          ex porro voluptatum tempora voluptates officiis temporibus provident
          eaque quod saepe aliquid ipsum, aspernatur sed alias reprehenderit
          fugit quam iste deleniti! Optio cupiditate enim non iusto quisquam
          laboriosam laudantium doloremque odio delectus nisi ipsa, quis earum
          sint, natus, neque accusantium obcaecati tenetur nostrum. Iusto nam
          dolores tempora necessitatibus, neque assumenda nesciunt rerum, unde
          hic nemo ipsa aspernatur consequatur eius iure officia accusamus
          explicabo odit, quis aut.
        </h1>
        <div className=" flex flex-wrap gap-8 justify-center md:w-[70%]">
          {categories}
        </div>
      </div>
    </>
  );
}
