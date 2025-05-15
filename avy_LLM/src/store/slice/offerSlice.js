import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "PlayStation Network Gift Card",
    image: "https://images7.alphacoders.com/489/thumb-1920-489590.jpg",
    category: "Entertaiment",
    company: "PlayStation",
    price: 200,
    filteredByPrice: true,
    filteredByCategory: true,
    filteredByCompanies: true,
  },
  {
    id: 2,
    title: "Amazon Marketplace Gift Card",
    image:
      "https://www.firmavestonii.com/wp-content/uploads/amazon-trading.png",
    category: "Marketplace",
    company: "Amazon",
    price: 260,
    filteredByPrice: true,
    filteredByCategory: true,
    filteredByCompanies: true,
  },
  {
    id: 5,
    title: "StarBucks Coffee Card 50% discount",
    image:
      "https://wallpapers.com/images/featured/starbucks-ack1avygrxnhaxjq.jpg",
    category: "Food&Drink",
    company: "StarBucks",
    price: 100,
    filteredByPrice: true,
    filteredByCategory: true,
    filteredByCompanies: true,
  },
  {
    id: 3,
    title: "Steam Gift Card",
    image: "https://cdn.akamai.steamstatic.com/store/home/store_home_share.jpg",
    category: "Marketplace",
    company: "Steam",
    price: 150,
    filteredByPrice: true,
    filteredByCategory: true,
    filteredByCompanies: true,
  },
  {
    id: 4,
    title: "StarBucks Coffee Card 10% discount",
    image:
      "https://wallpapers.com/images/featured/starbucks-ack1avygrxnhaxjq.jpg",
    category: "Food&Drink",
    company: "StarBucks",
    price: 50,
    filteredByPrice: true,
    filteredByCategory: true,
    filteredByCompanies: true,
  },
];

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    list: initialState,
  },
  reducers: {
    sortByCompany(state, { payload }) {
      state.list.forEach(
        (item) => (item.filteredByCompanies = item.company === payload)
      );
    },
    sortByCategory(state, { payload }) {
      state.list.forEach(
        (item) => (item.filteredByCategory = item.category === payload)
      );
    },
    sortByPrice(state, { payload }) {
      if (payload === "lowToHigh") {
        state.list.sort((a, b) => a.price - b.price);
      } else if (payload === "highToLow") {
        state.list.sort((a, b) => b.price - a.price);
      }
    },
    filterByPriceRange(state, { payload }) {
      state.list.forEach(
        (item) =>
        (item.filteredByPrice =
          item.price >= payload[0] && item.price <= payload[1])
      );
    },
    resetFilters(state) {
      state.list = state.list.map((item) => ({
        ...item,
        filteredByPrice: true,
        filteredByCategory: true,
        filteredByCompanies: true,
      }));
    }
  },
});

export const {
  sortByCompany,
  sortByCategory,
  sortByPrice,
  filterByPriceRange,
  resetFilters,
} = offerSlice.actions;
export default offerSlice.reducer;
