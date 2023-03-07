import * as reactBootstrap from "react-bootstrap";
import React from "react";
import { useDataApi } from "../hooks/useDataApi";
import { products } from "./Cart";
import { photos } from "../assets/photos";
import { ProductCard } from "./ProductCard";
import CartOffCanvas from "./CartOffCanvas";

export const Products = (props) => {
  const [items, setItems] = React.useState(products);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  //  Fetch Data
  const defaultUrl = "http://localhost:1337/api/products";
  const { Fragment, useState, useEffect, useReducer } = React;
  const [{ data, isLoading, isError }, setUrl, doFetch] = useDataApi(defaultUrl, {
    data: [],
  });

  useEffect(() => {
    // alert("updated");
    console.log(data);
    const newItems = data.data.map(x => x.attributes);
    setItems(newItems);
  },[data])

  const [query, setQuery] = useState(defaultUrl);
  console.log(`Rendering Products ${JSON.stringify(data)}`);
  // Fetch Data
  const addToCart = (item) => {
    if (item.instock <= 0) {
      alert(`${item.name} is currently out of stock...`);
      return;
    }

    updateStock(item, item.instock - 1);
    // let name = item.name;
    // let item = items.filter((item) => item.name == name);
    console.log(`add to Cart ${JSON.stringify(item)}`);
    setCart([...cart, item]);
  };

  const updateStock = (item, newStock) => {
    const index = items.findIndex((x) => x.name === item.name);
    console.log(index);
    const newItem = { ...item, instock: newStock };
    const newItems = [...items];
    newItems.splice(index, 1, newItem);

    console.log(`item updated ${item.name}: ${item.instock}`);
    console.log(newItem);

    setItems(newItems);
  };

  const deleteCartItem = (index) => {
    const item = items.find((x) => x.name === cart[index].name);
    updateStock(item, item.instock + 1);
    let newCart = cart.filter((item, i) => index != i);
    setCart(newCart);
  };

  const getPhoto = (item) => {
    const imagePath = photos[item.name];
    console.log(`image path for ${item.name}: ${imagePath}`);
    return imagePath;
  };

  let productList = items.map((item, index) => {
    return (
      <ProductCard
        item={{ ...item, image: getPhoto(item) }}
        addToCart={addToCart}
      />
    );
  });
  let cartList = cart.map((item, index) => {
    return (
      <reactBootstrap.Accordion.Item key={1 + index} eventKey={1 + index}>
        <reactBootstrap.Accordion.Header>
          {item.name}
        </reactBootstrap.Accordion.Header>
        <reactBootstrap.Accordion.Body
          className="text-dark"
          onClick={() => deleteCartItem(index)}
          eventKey={1 + index}
        >
          $ {item.cost} from {item.country}
        </reactBootstrap.Accordion.Body>
      </reactBootstrap.Accordion.Item>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    console.log(`total updated to ${newTotal}`);
    return newTotal;
  };

  // TODO: implement the restockProducts function
  const restockProducts = () => {
    doFetch();
    setUrl(defaultUrl);
    if(!isLoading && !isError) 
    {
      console.log(data);
      const newItems = data.data.map(x => x.attributes);
      setItems(newItems);
    }
  };

  return (
    <>
      <reactBootstrap.Container className="rounded">
        <h1>Product List</h1>
        <reactBootstrap.Row
          bg="light"
          className="rounded bg-light me-auto p-2 no-gutter d-flex justify-content-end"
        >
          {productList}
        </reactBootstrap.Row>

        <CartOffCanvas cart={cart} delete={(i) => deleteCartItem(i)} />
        <form
          onSubmit={(event) => {
            restockProducts(`http://localhost:1337/${query}`);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
          }}
        >
          <reactBootstrap.FormGroup>
            <reactBootstrap.Row>
              <reactBootstrap.Col>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="form-control"
                />
              </reactBootstrap.Col>
              <reactBootstrap.Col className="d-flex">
                <reactBootstrap.Button variant="secondary" Button type="submit">
                  ReStock Products
                </reactBootstrap.Button>
              </reactBootstrap.Col>
            </reactBootstrap.Row>
          </reactBootstrap.FormGroup>
        </form>
      </reactBootstrap.Container>
    </>
  );
};
