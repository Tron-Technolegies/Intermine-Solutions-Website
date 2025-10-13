import React, { useEffect, useState } from "react";
import { getProducts } from "../api/shopify"

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Shopify Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px",
              width: "200px",
            }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            )}
            <h4>{product.title}</h4>
            <p>{product.description?.slice(0, 50)}...</p>
            <p>
              {product.price} {product.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
