import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const response = await fetch(url);
    const cart = await response.json();
    return cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
  reducers: {
    clearCart: (state) => {
      return { ...state, cartItems: [] };
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    increaseAmount: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return item.id === id ? { ...item, amount: item.amount + 1 } : item;
      });
    },
    decreaseAmount: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return item.id === id ? { ...item, amount: item.amount - 1 } : item;
      });
    },
    getTotals: (state) => {
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.total = total;
      state.amount = amount;
    },
    loading: (state) => {
      state.isLoading = false;
    },
  },
});
// console.log(cartSlice);
export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  getTotals,
  loading,
} = cartSlice.actions;
export default cartSlice.reducer;
