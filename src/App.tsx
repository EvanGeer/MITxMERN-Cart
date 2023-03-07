import "./App.css";
import CartOffCanvas from "./components/CartOffCanvas";
import { Products } from "./components/Products";
import { Restock } from "./components/Restock";
import { StoreContext, useStore } from "./StoreContext";

function App() {
  const { store } = useStore();

  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <CartOffCanvas />
        <header className="App-header">
          <Products />
          <Restock />
        </header>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
