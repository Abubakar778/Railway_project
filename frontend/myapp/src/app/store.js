import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/product.js";
import singleProductSlice from "../features/products/singleProduct.js";
import filterCitySlice from "../features/products/filterCityWise";
import loginSlice from "../features/auth/loginSlice.js";
import registorSlice from "../features/auth/registorSlice.js";
import cartSlice from "../features/cart/cartSlice.js";
import citySlice from "../features/city/citySlice.js";
import userSlice from "../features/users/userSlice.js";
import orderListSlice from "../features/order/orderListSlice.js";
import singleOrderSlice from "../features/order/singleOrderSlice.js";
import createOrderSlice from "../features/order/createOrderSlice.js";
import orderPaySlice from "../features/order/orderPaySlice.js";

const store = configureStore({
  reducer: {
    productList: productSlice,
    singleProduct: singleProductSlice,
    filterCity: filterCitySlice,
    login: loginSlice,
    registor: registorSlice,
    cart: cartSlice,
    user: userSlice,
    city: citySlice,
    orderList: orderListSlice,
    singleOrder: singleOrderSlice,
    createOrder: createOrderSlice,
    orderPay: orderPaySlice,
  },
});

export default store;
