import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Fetch restaurant list for homepage
const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const proxyServer = "https://cors-anywhere.herokuapp.com/";
    const swiggyAPI =
      "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.6623758&lng=77.37344&carousel=true&third_party_vend";

    const response = await fetch(proxyServer + swiggyAPI);
    const Data = await response.json();

    return (
      Data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      []
    );
  }
);

// ✅ Fetch single restaurant menu (with info + offers + menu)
const fetchRestaurantMenu = createAsyncThunk(
  "restaurants/fetchRestaurantMenu",
  async (id) => {
    const proxyServer = "https://cors-anywhere.herokuapp.com/";
    const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6623758&lng=77.37344&restaurantId=${id}`;
    
    const response = await fetch(proxyServer + swiggyAPI);
    const Data = await response.json();

    // 🍴 Restaurant Info
    const restaurantInfo = Data?.data?.cards?.find(
      (c) =>
        c?.card?.card?.["@type"]?.includes(
          "swiggy.presentation.food.v2.Restaurant"
        )
    )?.card?.card?.info || {};

    // 🎉 Offers
    const offers =
      Data?.data?.cards?.find(
        (c) =>
          c?.card?.card?.["@type"]?.includes(
            "swiggy.gandalf.widgets.v2.GridWidget"
          )
      )?.card?.card?.gridElements?.infoWithStyle?.offers || [];

    // 📜 Menu
    const menuCards =
      Data?.data?.cards?.find((c) => c?.groupedCard)?.groupedCard
        ?.cardGroupMap?.REGULAR?.cards || [];

    const filteredMenu = menuCards.filter((item) => item?.card?.card?.title);

    return { id, restaurantInfo, offers, menu: filteredMenu };
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    menu: {},
    info: {},
    offers: {},
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        const { id, restaurantInfo, offers, menu } = action.payload;
        state.menu[id] = menu;
        state.info[id] = restaurantInfo;
        state.offers[id] = offers;
      });
  },
});

export { fetchRestaurants, fetchRestaurantMenu };
export default restaurantSlice.reducer;
