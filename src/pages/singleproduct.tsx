import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

export default function SingleProduct() {
  const [data, setData] = useState<any>(null);
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    const singleId = localStorage.getItem("singleId");
    if (singleId) {
      fetch(`https://fakestoreapi.com/products/${singleId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setShow(true);
          }
          setData(json);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [data]);

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

  return (
    <>
      {data ? (
        show &&
        data && (
          // const isSelected = selectedProductIds.includes(data.id),

          <div>
            <div className="my-5 mb-6">
              <Link
                href="/"
                className="text-[#191414] text-[20px] font-semibold"
              >
                Home /
              </Link>
              <Link href={``} className="capitalize text-grey">
                {data.category}
              </Link>
            </div>
            <div>
              <div key={data.id}>
                <div className="flex flex-col flex-wrap sm:flex-row items-center gap-10">
                  <div className="hidden lg:flex lg:flex-col gap-5">
                    <Image
                      className="block h-[150px] sm:h-[150px] w-[100px] sm:w-[150px]"
                      src={data.image}
                      width={"100"}
                      height={"150"}
                      alt="card"
                    />
                    <Image
                      className="block h-[150px] sm:h-[150px] w-[100px] sm:w-[150px]"
                      src={data.image}
                      width={"100"}
                      height={"150"}
                      alt="card"
                    />
                    <Image
                      className="block h-[150px] sm:h-[150px] w-[100px] sm:w-[150px]"
                      src={data.image}
                      width={"100"}
                      height={"150"}
                      alt="card"
                    />
                  </div>
                  <div>
                    <Image
                      className="block h-[150px] sm:h-[210px] w-[150px] sm:w-[210px]"
                      src={data.image}
                      width={"150"}
                      height={"150"}
                      alt="card"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[45px]">{data.price} $</h4>
                    <p className="text-mainColor font-semibold max-w-[400px] my-2">
                      {data.title}
                    </p>
                    <p className=" max-w-[400px]">{data.description}</p>
                    <div className="flex  gap-2 mt-2">
                      <button
                        className={`  sm:px-2 sm:py-3 rounded-md flex items-center gap-3 ${
                          selectedProductIds.includes(data.id)
                            ? "text-black bg-white border border-mainColor p-0"
                            : "bg-mainColor text-white"
                        }`}
                        onClick={() => {
                          addToCart(data.id);
                          handleProductClick(data.id);
                        }}
                      >
                        <AiOutlineShoppingCart size={20} /> Add to Card
                      </button>
                      <button
                        className={` text-white p-2 sm:px-4 sm:py-3  rounded-md ${
                          selectedLikeIds.includes(data.id)
                            ? "bg-white text-black border border-mainColor"
                            : "bg-mainColor"
                        }`}
                        onClick={() => {
                          addLike(data.id);
                          handleLikeClick(data.id);
                        }}
                      >
                        <AiOutlineHeart
                          size={20}
                          color={
                            selectedLikeIds.includes(data.id)
                              ? "black"
                              : "white"
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-[32px]">Main</h2>
                    <p className=" xl:max-w-[450px] max-w-full">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Atque, voluptatibus dicta expedita sit aut at, nulla
                      culpa, ipsum facilis laboriosam eius quisquam eaque
                      ducimus porro mollitia! Totam facere ex enim dicta
                      deserunt voluptate possimus odit? Reprehenderit impedit
                      officia ipsam, dicta ducimus unde mollitia fugit dolore
                      eaque eligendi non labore rerum molestiae sed voluptates
                      illum perferendis accusantium minima explicabo iste
                      repudiandae amet tempore. Optio corporis, numquam cum
                      deserunt molestiae aut consequatur ex consectetur
                      inventore non! Quasi error inventore, consequatur optio ad
                      molestiae dolor aperiam doloribus perferendis sed laborum
                      velit doloremque repellendus nulla magnam et at quam
                      dolores beatae natus. Perferendis, autem. molestiae dolor
                      aperiam doloribus perferendis sed laborum velit doloremque
                      repellendus nulla magnam et at quam dolores beatae natus.
                      Perferendis, autem. molestiae dolor aperiam doloribus
                      perferendis sed laborum velit doloremque repellendus nulla
                      magnam et at quam dolores beatae natus. Perferendis,
                      autem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <h1 className="text-center font-semibold text-[32px]">
          Product not found 🧐
        </h1>
      )}
    </>
  );
}
