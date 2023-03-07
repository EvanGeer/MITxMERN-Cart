import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import product from "../types/product";
import { Cart, products } from "./Cart";
import * as reactBootstrap from "react-bootstrap";
import currencyFormat from "../assets/currencyFormat";

interface CartProps {
  cart: product[];
  delete: (i: number) => void;
}

export default function CartOffCanvas(cart: CartProps) {
  const [show, setShow] = useState(false);

  console.log(`Cart Offcanvas: ${cart}`);
  console.log(cart);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const total = currencyFormat.format(
    cart?.cart?.reduce((subTotal, item) => subTotal + item.cost, 0)
  );

  return (
    <>
      <Button onClick={toggleShow} className="m-2">
        <reactBootstrap.Container className="pe-4">
          <reactBootstrap.Row>
            <reactBootstrap.Col>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>{" "}
            </reactBootstrap.Col>
            <reactBootstrap.Col>
              <reactBootstrap.Row>
                {cart?.cart?.length ?? 0} items
              </reactBootstrap.Row>
              <reactBootstrap.Row>{total}</reactBootstrap.Row>
            </reactBootstrap.Col>
          </reactBootstrap.Row>
        </reactBootstrap.Container>
      </Button>

      <Offcanvas
        show={show}
        placement="end"
        onHide={handleClose}
        scroll={false}
        backDrop={true}
        className="size-sm bg-dark text-light"
      >
        <Offcanvas.Header closeButton className="fluid">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>{" "}
          <Offcanvas.Title className="me-auto p-2">
            {" "}
            Shopping Cart
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart cart={cart.cart} deleteFunc={cart.delete} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
