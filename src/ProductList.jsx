Set-Content -Path src/ProductList.jsx -Value 'import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters toxins from air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes indoor pollutants.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114441_1280.jpg", description: "Adds humidity naturally.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/16/ficus-elastica-4850629_1280.jpg", description: "Easy care, bold look.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/02/aloe-vera-3284687_1280.jpg", description: "Soothes skin and cleans air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/20/37/lavender-829555_1280.jpg", description: "Relaxing natural aroma.", cost: "$15" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2016/10/25/12/28/jasmine-1768810_1280.jpg", description: "Sweet floral fragrance.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/08/rosemary-4541241_1280.jpg", description: "Fresh herbal scent.", cost: "$12" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/17/10/mint-1162817_1280.jpg", description: "Invigorating herb.", cost: "$8" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/18/18/31/lemon-balm-2324394_1280.jpg", description: "Citrusy, calming scent.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2020/08/04/14/42/eucalyptus-5463046_1280.jpg", description: "Refreshing spa scent.", cost: "$16" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://cdn.pixabay.com/photo/2021/09/20/06/55/tulsi-6640026_1280.jpg", description: "Traditional healing herb.", cost: "$9" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2016/08/16/18/05/echinacea-1598687_1280.jpg", description: "Immune system support.", cost: "$14" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/08/17/peppermint-2496223_1280.jpg", description: "Aids digestion.", cost: "$9" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2017/07/11/17/43/marigold-2494411_1280.jpg", description: "Soothes irritated skin.", cost: "$11" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/06/17/13/32/chamomile-1463283_1280.jpg", description: "Promotes sleep.", cost: "$10" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/08/13/18/thyme-2295248_1280.jpg", description: "Antioxidant rich herb.", cost: "$8" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", background: "#4CAF50", color: "white" }}>
        <div style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <span style={{ cursor: "pointer" }} onClick={() => setShowCart(false)}>Plants</span>
          <span style={{ cursor: "pointer" }} onClick={() => setShowCart(true)}>Cart 🛒 ({totalCartCount})</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" style={{ padding: "20px" }}>
          {plantsArray.map((cat, index) => (
            <div key={index}>
              <h2 style={{ textAlign: "center", margin: "20px 0" }}>{cat.category}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                {cat.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", width: "220px", textAlign: "center" }}>
                    <img src={plant.image} alt={plant.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      style={{ padding: "8px 16px", background: addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "#ccc" : "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;