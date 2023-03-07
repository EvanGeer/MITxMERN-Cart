import product from "../types/product";
import * as reactBootstrap from "react-bootstrap";

interface cartItemProps {
  
}

export function CartItem({item, index, deleteCallback}: {item: product, index: number, deleteCallback: () => void}) {
    return (
        <reactBootstrap.Accordion.Item key={1 + index} eventKey={(1 + index).toString()}>
          <reactBootstrap.Accordion.Header>
            {item.name}
          </reactBootstrap.Accordion.Header>
          <reactBootstrap.Accordion.Body
            className="text-dark"
            onClick={() => deleteCallback()}
          >
            $ {item.cost} from {item.country}
          </reactBootstrap.Accordion.Body>
        </reactBootstrap.Accordion.Item>
      );
}