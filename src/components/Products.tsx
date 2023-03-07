import * as reactBootstrap from "react-bootstrap";
import React, { useContext } from "react";
import { IPhotoSelector, photos } from "../assets/photos";
import { ProductCard } from "./ProductCard";
import CartOffCanvas from "./CartOffCanvas";
import { StoreContext } from "../StoreContext";
import Store from "../types/Store";
import product from "../types/product";

export const Products = () => {
  const { productList, addToCart } = useContext<Store>(StoreContext);

  console.info("Products") 
  console.log(productList);

  const getPhoto = (item:product) => {
    const imagePath = photos[item.name as keyof IPhotoSelector];
    console.log(`image path for ${item.name}: ${imagePath}`);
    return imagePath;
  };

  let productCards = productList?.map((item, index) => {
    return (
      <ProductCard
        item={{ ...item, image: getPhoto(item) }}
        addToCart={addToCart}
      />
    );
  });
  

  return (
    <>
      <reactBootstrap.Container className="rounded">
        <h1>Product List</h1>
        <reactBootstrap.Row className="rounded bg-opacity-25 bg-light me-auto p-2 no-gutter d-flex justify-content-end">
          {productCards}
        </reactBootstrap.Row>

        <CartOffCanvas />


      </reactBootstrap.Container>
    </>
  );
};
