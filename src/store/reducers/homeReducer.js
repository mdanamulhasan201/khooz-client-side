import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//get category
export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
      // console.log(data)
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

//get products
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
// product details
export const get_product_details = createAsyncThunk(
  "product/get_product_details",
  async (slug, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product-details/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

//get products
export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
//get products

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&lowPrice=${
          query.low
        }&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.pageNumber
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

// customer review
export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/add-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-reviews/${productId}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

// provider review sections

export const provider_review = createAsyncThunk(
  "reviews/provider_review",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/home/provider/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const get_provider_reviews = createAsyncThunk(
  "reviews/get_provider_reviews",
  async ({ sellerId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/provider/get-provider-reviews/${sellerId}`
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 4,
    topRated_product: [],
    discount_product: [],
    latest_product: [],
    priceRange: {
      low: 0,
      high: 10000,
    },
    product: {},
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
    totalReviews: 0,
    rating_reviews: [],
    reviewss: [],
  },

  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },

  extraReducers: {
    [get_category.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
    },

    [get_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.latest_product = payload.latest_product;
      state.topRated_product = payload.topRated_product;
      state.discount_product = payload.discount_product;
    },

    [get_product_details.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.moreProducts = payload.moreProducts;
    },

    [price_range_product.fulfilled]: (state, { payload }) => {
      state.latest_product = payload.latest_product;
      state.priceRange = payload.priceRange;
    },
    [query_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.totalProduct = payload.totalProduct;
      state.parPage = payload.parPage;
    },
    [customer_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_reviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalReview = payload.totalReview;
      state.rating_review = payload.rating_review;
    },

    [provider_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },

    [get_provider_reviews.fulfilled]: (state, { payload }) => {
      state.reviewss = payload.reviewss;
      state.totalReviews = payload.totalReviews;
      state.rating_reviews = payload.rating_reviews;
    },
  },
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
