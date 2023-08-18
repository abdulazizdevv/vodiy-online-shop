export async function getPostIdList() {
  const data = await fetch(`https://fakestoreapi.com/products/categories`);
  const res = await data.json();
  return res.map((post: any) => {
    return {
      params: {
        id: post,
      },
    };
  });
}

export async function getPostDetails(postId: string): Promise<any> {
  const data = await fetch(
    `https://fakestoreapi.com/products/category/${postId}`
  );
  const res = await data.json();

  return res;
  }
