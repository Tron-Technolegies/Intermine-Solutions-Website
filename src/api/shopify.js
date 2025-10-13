import axios from "axios";


const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

if (!domain || !token) {
  console.warn("⚠️ Missing Shopify domain or token in .env file!");
}

// Create Axios instance for Shopify API
export const shopifyAPI = axios.create({
  baseURL: `https://${domain}/api/2024-07/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Helper function to normalize product data
function normalizeProduct(node) {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image:
      node.featuredImage?.url ||
      node.images?.edges?.[0]?.node?.url ||
      null,
    price:
      node.variants?.edges?.[0]?.node?.price?.amount || "N/A",
    currency:
      node.variants?.edges?.[0]?.node?.price?.currencyCode || "USD",
  };
}

// Fetch products from Shopify Storefront API
export const getProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyAPI.post("", { query });
    const products = response.data.data.products.edges.map((edge) =>
      normalizeProduct(edge.node)
    );
    return products;
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return [];
  }
};
