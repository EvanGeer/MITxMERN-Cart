import * as Bootstrap from "react-bootstrap";
import currencyFormat from "../assets/currencyFormat";
import product from "../types/product";

interface productCardProps {
  item: product;
  addToCart: (item: product) => void;
}

export function ProductCard(props: productCardProps) {
  const { item, addToCart } = props;
  console.log(props);
  console.log(item);

  const plusClick = () => {
    addToCart(item);
  };

  return (
    <Bootstrap.Col className="p-1">
      <Bootstrap.Card bg="dark" className="p-0 shadow m-0 fluid"
        >
        <Bootstrap.Card.Header className="bg-light text-dark fluid d-flex">
          <Bootstrap.Image
            src={item?.image}
            width={40}
            className="float-start me-3 ms-0"
            roundedCircle
          ></Bootstrap.Image>
          {/* <h3 className="float-end"> */}
          {item?.name}
          {/* </h3> */}
        </Bootstrap.Card.Header>
        <Bootstrap.Card.Body>
          <small className="text-muted">
            From: {item.country}
            <br />
            Stock: {item.instock}
          </small>
        </Bootstrap.Card.Body>
        <Bootstrap.Card.Footer className="fluid p-2">
          <p className="float-start m-0 p-0">{currencyFormat.format(item.cost)}</p>
          <Bootstrap.Button
            variant="primary"
            onClick={plusClick}
            className="float-end fluid"
          >
            Add to Cart
          </Bootstrap.Button>
        </Bootstrap.Card.Footer>
      </Bootstrap.Card>
    </Bootstrap.Col>
  );
}
