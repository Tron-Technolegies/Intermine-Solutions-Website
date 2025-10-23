import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../productpages/ProductDetails.css";

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
                  title
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

        if (data?.data?.product) {
          setProduct(data.data.product);
        } else {
          console.error("Product not found or API response invalid:", data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  // ✅ BUY NOW HANDLER (No GraphQL checkout mutation)
  const handleBuyNow = () => {
    if (!product) return;

    // Extract variant ID
    const shopifyGid = product.variants.edges[0].node.id;

    // Convert Shopify GID (e.g. gid://shopify/ProductVariant/123456789) → numeric ID
    const numericVariantId = shopifyGid.split("/").pop();

    // Redirect user directly to Shopify checkout/cart
    const checkoutUrl = `https://shop.intermine-solutions.de/cart/${numericVariantId}:1`;
    window.location.href = checkoutUrl;
  };

  if (loading) return <p className="loading-text">Loading product...</p>;
  if (!product) return <p className="error-text">Product not found</p>;

  return (
    <div className="product-details-container sora">
      <div className="product-details-image-section">
        <img
          src={product.images.edges[0]?.node.src}
          alt={product.title}
          className="product-details-main-image"
        />
      </div>
      <div className="product-details-info">
        <h2 className="product-details-title">{product.title}</h2>
        <p className="product-details-price">
          Price: {product.variants.edges[0].node.price.amount}{" "}
          {product.variants.edges[0].node.price.currencyCode}
        </p>
        <div className="product-details-description">
          {product.description}
        </div>
        <button onClick={handleBuyNow} className="buy-now-btn">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;