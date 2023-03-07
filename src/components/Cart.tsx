import * as reactBootstrap from "react-bootstrap";
import React, { useContext } from "react";
import product from "../types/product";
import { CartItem } from "./CartItem";
import currencyFormat from "../assets/currencyFormat";
import { StoreContext } from "../StoreContext";
import Store from "../types/Store";

export function Cart() {
  const {formattedTotal, cart, removeFromCart} = useContext<Store>(StoreContext)

  let cartList = cart?.map((item:product, index:number) => {
    return (
      <CartItem item={item} index={index} deleteCallback={() => removeFromCart(index)} />
    );
  });

  return (
    <>
      <h1>Cart Contents</h1>
      <reactBootstrap.Accordion defaultActiveKey="0">
        {cartList}
      </reactBootstrap.Accordion>
      <h1>CheckOut </h1>
      <reactBootstrap.Button>CheckOut {formattedTotal}</reactBootstrap.Button>
    </>
  );
};
