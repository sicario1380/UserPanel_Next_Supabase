import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  isExpanded: boolean;
  selectedItem: string | null;
  hoveredItem: string | null;
  error: string | null;
}

const initialState: NavbarState = {
  isExpanded: false,
  selectedItem: null, // Initialize to null
  hoveredItem: null,
  error: null,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    selectItem: (state, action: PayloadAction<string | null>) => {
      // Accept null payload
      state.selectedItem = action.payload;
    },
    hoverItem: (state, action: PayloadAction<string | null>) => {
      state.hoveredItem = action.payload;
    },
    resetHoverItem: (state) => {
      state.hoveredItem = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  toggleNavbar,
  selectItem,
  hoverItem,
  resetHoverItem,
  setError,
  clearError,
} = navbarSlice.actions;

export default navbarSlice.reducer;
