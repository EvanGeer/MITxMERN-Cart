import { useContext } from "react";
import * as reactBootstrap from "react-bootstrap";
import { StoreContext } from "../StoreContext";
import Store from "../types/Store";


export function Restock() {
    const {restockProducts, restockQuery, setRestockQuery} = useContext<Store>(StoreContext);

    return (
        <form
          className="mt-3"
          onSubmit={(event) => {
            
            restockProducts();
            console.log(`Restock called on ${restockQuery}`);
            event.preventDefault();
          }}
        >
          <reactBootstrap.FormGroup>
            <reactBootstrap.Row>
              <reactBootstrap.Col>
                <input
                  type="text"
                  value={restockQuery}
                  onChange={(event) => setRestockQuery(event.target.value)}
                  className="form-control"
                />
              </reactBootstrap.Col>
              <reactBootstrap.Col className="d-flex">
                <reactBootstrap.Button variant="secondary" type="submit">
                  ReStock Products
                </reactBootstrap.Button>
              </reactBootstrap.Col>
            </reactBootstrap.Row>
          </reactBootstrap.FormGroup>
        </form>

    )
}