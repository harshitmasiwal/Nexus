import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";


// {type : 'coin/fetch/pending' , payload : undefined}
// {type : 'coin/fetch/fullfilled' , payload : data}
// {type : 'coin/fetch/rejected' , payload : error.message}

const FetchData = createAsyncThunk(


    //ye hamare liye actions ki trah work krega joki dispatch honge
    //Actions : {type : 'name/functionka' , payload : 'attached parameters}

    'coin/fetch',
    async (args , thunkAPI)=>{
        try{
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${args}`)
            const data = await response.json()
            return data
        }
        catch(error){
            return rejectedWithValue(error.message)
        }
    }
)
    

const FirstSlice = createSlice(
    {
        name : "FirstSlice",
        initialState : {data : [] , loading:false , error : null},
        reducers : {},
        extraReducers : (builder)=>{
            builder
            .addCase(FetchData.pending , (state)=>{
                state.loading = true 
                state.error = null
            })
            .addCase(FetchData.fulfilled , (state,action)=>{
                state.data = action.payload
                state.loading = false
            })
            .addCase(FetchData.rejected , (state , action)=>{
                state.error = action.error
                state.loading = false
            }) 
        }
    }
)

export default FirstSlice.reducer
export {FetchData}