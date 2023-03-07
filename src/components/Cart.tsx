import * as reactBootstrap from "react-bootstrap";
import React from "react";
import product from "../types/product";
import { CartItem } from "./CartItem";
import currencyFormat from "../assets/currencyFormat";

// simulate getting products from DataBase
export const products = [
  { name: "Apples", country: "Italy", cost: 3, instock: 10 },
  { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
  { name: "Beans", country: "USA", cost: 2, instock: 5 },
  { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
];
//=========Cart=============
interface CartProps {
  cart: product[];
  deleteFunc: (index: number) => void;
}


export function Cart(props: CartProps) {
  const {cart, deleteFunc} = props;
  // let data = props?.location?.data ? props?.location?.data : products;
  // console.log(`data:${JSON.stringify(data)}`);
  const total = currencyFormat.format(cart?.reduce((subTotal, item) => subTotal + item.cost, 0));

  let cartList = cart.map((item, index) => {
    return (
      <CartItem item={item} index={index} deleteCallback={() => deleteFunc(index)} />
      // <reactBootstrap.Accordion.Item key={1 + index} eventKey={(1 + index).toString()}>
      //   <reactBootstrap.Accordion.Header>
      //     {item.name}
      //   </reactBootstrap.Accordion.Header>
      //   <reactBootstrap.Accordion.Body
      //     className="text-dark"
      //     onClick={() => cart.delete(index)}
      //     // eventKey={(1 + index).toString()}
      //   >
      //     $ {item.cost} from {item.country}
      //   </reactBootstrap.Accordion.Body>
      // </reactBootstrap.Accordion.Item>
    );
  });

  return (
    // <reactBootstrap.Accordion defaultActiveKey="0">{props.list}</reactBootstrap.Accordion>;
    <>
      <h1>Cart Contents</h1>
      <reactBootstrap.Accordion defaultActiveKey="0">
        {cartList}
      </reactBootstrap.Accordion>
      <h1>CheckOut </h1>
      <reactBootstrap.Button>CheckOut {total}</reactBootstrap.Button>
    </>
  );
};
