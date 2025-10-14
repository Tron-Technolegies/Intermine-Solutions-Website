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
          path: "products",
          element: <ProductList />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;