import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";

const { createOrder } = useOrder();
const { cart } = useCart();

<button
  style={btn}
  onClick={() => {
    const orderId = createOrder(cart);
    alert(`Order placed successfully!\nYour Order ID: ${orderId}`);
  }}
>
  Place Order
</button>
