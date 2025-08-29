// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const fetchRestaurants = createAsyncThunk(
//   "restaurants/fetchRestaurants",
//   async () => {
//     const proxyServer = "https://cors-anywhere.herokuapp.com/";
//     const swiggyAPI =
//       "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.6623758&lng=77.37344&carousel=true&third_party_vend";

//     const response = await fetch(proxyServer + swiggyAPI);
//     const Data = await response.json();
//     return (
//       Data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants || []
//     );
//   }
// );

// const fetchRestaurantMenu = createAsyncThunk(
//   "restaurants/fetchRestaurantMenu",
//   async (id) => {
//     const proxyServer = "https://cors-anywhere.herokuapp.com/";
//     const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6623758&lng=77.37344&restaurantId=${id}`;
//     const response = await fetch(proxyServer + swiggyAPI);
//     const Data = await response.json();
    
//     const tempData =
//       Data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
//     const filteredData = tempData.filter(
//       (item) => item?.card?.card?.categoryId
//     );

//     return { id, menu: filteredData };
//   }
// );

// const resturantSlice = createSlice({
//   name: "restaurants",
//   initialState: {
//     list: [],
//     menu: {},
//     status: "idle",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRestaurants.fulfilled, (state, action) => {
//         state.list = action.payload;
//       })
//       .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
//   state.menu[action.payload.id] = action.payload.menu;
// });
//   },
// });

// export { fetchRestaurants };
// export { fetchRestaurantMenu };
// export default resturantSlice.reducer;
