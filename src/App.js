import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotals, fetchCart } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { modalOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getTotals());
  }
  , [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (isLoading) {
    return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
    );
  };

  return (
    <main>
    {modalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
