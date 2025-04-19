import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ReservaProvider } from "./context/ReservaContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <ServiceProvider>
          <ReservaProvider>
            <RouterProvider router={router} />
          </ReservaProvider>
        </ServiceProvider>
      </ProductProvider>
    </AuthProvider>
  );
};



export default App;
