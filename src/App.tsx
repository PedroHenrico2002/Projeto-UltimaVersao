
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import ConfirmOrder from "./pages/ConfirmOrder";
import Checkout from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";
import OrderTracking from "./pages/OrderTracking";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
          <Route path="/food/:restaurantId/:foodId" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/orders" element={<Orders />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
