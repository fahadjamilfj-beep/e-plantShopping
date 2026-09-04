Set-Content -Path src/CartItem.jsx -Value 'import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace("$", ""));
      return total + costNum * item.quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div className="cart-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      {cart.map(item => (
        <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
          </div>
          <div>
            <button onClick={() => handleDecrement(item)} style={{ padding: "5px 10px", marginRight: "5px" }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)} style={{ padding: "5px 10px", marginLeft: "5px" }}>+</button>
          </div>
          <p>Subtotal: ${parseFloat(item.cost.replace("$", "")) * item.quantity}</p>
          <button onClick={() => dispatch(removeItem(item.name))} style={{ padding: "5px 10px", background: "#ff4d4d", color: "white", border: "none", borderRadius: "4px" }}>Delete</button>
        </div>
      ))}

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={onContinueShopping} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Continue Shopping</button>
        <button onClick={handleCheckout} style={{ padding: "10px 20px", background: "#008CBA", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;