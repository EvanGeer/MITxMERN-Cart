import { createContext, useEffect, useState } from "react";
import currencyFormat from "./assets/currencyFormat";
import { useDataApi } from "./hooks/useDataApi";
import product from "./types/product";

export const StoreContext = createContext<any>(null);

// simulate getting products from DataBase
const defaultProducts = [
  { name: "Apples", country: "Italy", cost: 3, instock: 10 },
  { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
  { name: "Beans", country: "USA", cost: 2, instock: 5 },
  { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
];

export function useStore() {
  // Store
  const [productList, setProductList] = useState(defaultProducts);
  const [cart, setCart] = useState(new Array<product>());
  const [formattedTotal, setFormattedTotal] = useState("");
  const [total, setTotal] = useState(0);

  // Restock
  const baseUrl = "http://localhost:1337/";
  const defaultQuery = "api/products";
  const [restockQuery, setRestockQuery] = useState(defaultQuery);
  const [{ data, isLoading, isError }, setUrl, doFetch] = useDataApi(baseUrl + restockQuery, {
    data: [],
  });

  useEffect(() => {
    setUrl(baseUrl + restockQuery)
  }, [restockQuery])

  useEffect(() => {
    console.log(data);
    const newItems = data?.data?.map((x: any) => x.attributes);
    setProductList(newItems ?? defaultProducts);
  }, [data]);

  useEffect(() => {
    const newTotal = cart.reduce((subTotal, item) => subTotal + item.cost, 0);
    const newFormattedTotal = currencyFormat.format(newTotal);

    setTotal(newTotal);
    setFormattedTotal(newFormattedTotal);
  }, [cart]);

  const removeFromCart = (index: number) => {
    const item = productList?.find(
      (x) => x.name === cart[index].name
    ) as product;
    if (!item) {
      console.error("attempt to delete missing cart item");
      return;
    }
    updateStock(item, item.instock + 1);
    let newCart = cart.filter((item, i) => index != i);
    setCart(newCart);
  };

  const addToCart = (item: product) => {
    if (item.instock <= 0) {
      alert(`${item.name} is currently out of stock...`);
      return;
    }

    updateStock(item, item.instock - 1);
    console.log(`add to Cart ${JSON.stringify(item)}`);
    setCart([...cart, item]);
  };

  const updateStock = (item: product, newStock: number) => {
    const index = productList?.findIndex((x) => x.name === item.name);
    console.log(index);
    const newItem = { ...item, instock: newStock };
    const newItems = [...productList];
    newItems.splice(index, 1, newItem);

    console.log(`item updated ${item.name}: ${item.instock}`);
    console.log(newItem);

    setProductList(newItems);
  };

  // TODO: implement the restockProducts function
  const restockProducts = () => {
    doFetch();

    if (!isLoading && !isError) {
      console.log(data);
      const newItems = data?.data?.map((x: any) => x.attributes);
      setProductList(newItems);
    }
  };

  const store = {
    productList,
    cart,
    removeFromCart,
    addToCart,
    total,
    formattedTotal,
    restockProducts,
    restockQuery,
    setRestockQuery,
  }

  return { store };
}
