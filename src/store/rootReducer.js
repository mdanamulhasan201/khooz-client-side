import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import providerReducer from "./reducers/providerReducer";
import chatReducer from "./reducers/chatReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  provider: providerReducer,
  chat: chatReducer,
};
export default rootReducer;
