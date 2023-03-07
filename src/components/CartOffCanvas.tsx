import { useContext, useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { Cart } from "./Cart";
import { StoreContext } from "../StoreContext";
import Store from "../types/Store";

export default function CartOffCanvas() {
  const {cart, formattedTotal} = useContext<Store>(StoreContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <div className="bg-opacity-25 p-0 fluid fixed-top d-flex bg-primary justify-content-between align-items-center ps-4">
        <div>
          <h1 className="text-light m-0 p-0">React Store</h1>
        </div>
        <Button className="border-1 m-2 p-0 pe-3 ps-3 float-end">
          <div
            className="d-flex text-light align-items-center p-0 m-0"
            onClick={toggleShow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-cart me-3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>{" "}
            <div>
              <small className="opacity-75">
                {cart?.length ?? 0} items
                <br />
                {formattedTotal}
              </small>
            </div>
          </div>
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
            <Cart />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
