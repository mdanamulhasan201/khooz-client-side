import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import providerReducer from "./reducers/providerReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  provider: providerReducer,
};
export default rootReducer;
