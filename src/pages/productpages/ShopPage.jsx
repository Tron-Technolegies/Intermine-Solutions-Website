import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Added for navigation
import "../productpages/ShopPage.css";

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let products = [];
        let hasNextPage = true;
        let cursor = null;

        while (hasNextPage) {
          const query = `
            {
              products(first: 100${cursor ? `, after: "${cursor}"` : ""}) {
                edges {
                  node {
                    id
                    title
                    handle
                    description
                    images(first: 1) {
                      edges {
                        node {
                          src
                        }
                      }
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                  cursor
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
          `;

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
          const fetchedProducts = data.data.products.edges;

          products = [...products, ...fetchedProducts];
          hasNextPage = data.data.products.pageInfo.hasNextPage;

          if (hasNextPage && fetchedProducts.length > 0) {
            cursor = fetchedProducts[fetchedProducts.length - 1].cursor;
          }
        }

        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageChange(1)} className="page-number">
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="dots1" className="page-dots">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="dots2" className="page-dots">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="page-number"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="shop-page-wrapper">
      {/* <h2 className="shop-heading sora">Our Products</h2> */}

      <div className="shop-container sora">
        {currentProducts.length === 0 ? (
          <p className="no-products-text">No products available.</p>
        ) : (
          currentProducts.map((product) => {
            const p = product.node;
            return (
              <div key={p.id} className="product-card">
                <img
                  src={p.images.edges[0]?.node.src}
                  alt={p.title}
                  className="product-image"
                />
                <h3 className="product-title">{p.title}</h3>
                <p className="product-price">
                  {p.priceRange.minVariantPrice.amount}{" "}
                  {p.priceRange.minVariantPrice.currencyCode}
                </p>

                {/* ✅ Updated: React Router Link */}
                <Link to={`/product/${p.handle}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-nav-btn"
          >
            Previous
          </button>

          <div className="page-numbers">{renderPageNumbers()}</div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-nav-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
