import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

const initialState = {
  books: [],
  favourites: [],
  cart: [],
  searchQuery: "",
  isSearchOn: false,
  isLoadingSpin: false,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      const books = action.payload;
      state.books = books;
      state.favourites = books.filter((book, id) => book.is_favourite === true);
      state.cart = books.filter((book, id) => book.is_item_in_cart === true);
    },

    setSearch(state, action) {
      state.isSearchOn = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setLoadingSpin(state, action) {
      state.isLoadingSpin = action.payload;
    },
  },
});
export const { setBooks, setSearch, setSearchQuery, setLoadingSpin } =
  booksSlice.actions;

export default booksSlice.reducer;
