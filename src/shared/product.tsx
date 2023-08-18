export async function getJewelery() {
  const data = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const res = await data.json();

  return res;
}
export async function getElectronics() {
  const data = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const res = await data.json();

  return res;
}
export async function getMens() {
  const data = await fetch(
    "https://fakestoreapi.com/products/category/men's clothing"
  );
  const res = await data.json();

  return res;
}
export async function getWomen() {
  const data = await fetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );
  const res = await data.json();

  return res;
}
