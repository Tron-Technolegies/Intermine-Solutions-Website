import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../productpages/ProductDetails.css"

const ProductDetails = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `
        {
          product(handle: "${handle}") {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch(
          "https://shop.intermine-solutions.de/api/2024-10/graphql.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": import.meta.env
                .VITE_SHOPIFY_STOREFRONT_TOKEN,
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        setProduct(data.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleBuyNow = async () => {
    if (!product) return;

    const variantId = product.variants.edges[0].node.id;

    const checkoutQuery = `
      mutation {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${variantId}", quantity: 1 }]
        }) {
          checkout {
            webUrl
          }
        }
      }
    `;

    try {
      const response = await fetch(
        "https://shop.intermine-solutions.de/api/2024-10/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env
              .VITE_SHOPIFY_STOREFRONT_TOKEN,
          },
          body: JSON.stringify({ query: checkoutQuery }),
        }
      );

      const data = await response.json();
      const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;
      window.location.href = checkoutUrl; // Redirect to Shopify checkout
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details-container sora">
      <img
        src={product.images.edges[0]?.node.src}
        alt={product.title}
        className="product-details-image"
      />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        Price: {product.variants.edges[0].node.price.amount}{" "}
        {product.variants.edges[0].node.price.currencyCode}
      </p>
      <button onClick={handleBuyNow} className="buy-now-btn">
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;
