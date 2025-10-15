import React from "react";
import ProductList from "./components/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";

import HomePage from "./pages/HomePage";
import HostingServicesPage from "./pages/HostingServicesPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./components/blogs/BlogDetails";
import Blogs from "./components/blogs/Blogs";
import FacilitiesPage from "./pages/FacilitiesPage";
import ShopPage from "./pages/productpages/ShopPage";
import ProductDetails from "./pages/productpages/ProductDetails";



const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,

      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/hosting-services",
          element: <HostingServicesPage/>
        },
        {
          path : "/blogs",
          element: <BlogPage/>
        },
        {
          path: "/blogs/:id",
          element: <BlogDetails/>
        },
        {
          path: "facilities",
          element: <FacilitiesPage/>
        },

        {
          path : "shop",
          element: <ShopPage/>
          
        },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "product/:handle",
          element: <ProductDetails/>
        }
       
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;