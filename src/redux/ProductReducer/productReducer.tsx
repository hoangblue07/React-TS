import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { http } from '../../util/config';


export type ProductModel = {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
}
export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
}

export type ProductState = {
    arrProduct: ProductModel[],
    productDetail: ProductDetailModel | null
}


const initialState: ProductState = {
    arrProduct: [],
    productDetail: null,
}

const ProductReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrProduct = action.payload;
        }
    },
    extraReducers(builder) {
        //pending: đang xử lý
        //fulfilled: đã xử lý thành công
        //rejected: thất bại
        builder.addCase(getProductDetailApi.pending, (state, action) => {
            // bật loading
        });
        builder.addCase(getProductDetailApi.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            // tắt loading
            state.productDetail = action.payload;

        });
        builder.addCase(getProductDetailApi.rejected, (state, action) => {
            // tắt loading

        })
    },

});

export const { setArrProductAction } = ProductReducer.actions;

export default ProductReducer.reducer;




//------------------------- action api async ------------------------//*

export const getProductApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(`api/Product`);
            const content: ProductModel[] = result.data.content;
            // sau khi lấy dữ liệu từ api thì sẽ đispatch lên store
            const action: PayloadAction<ProductModel[]> = setArrProductAction(content);
            dispatch(action);

        } catch (error) {
            console.log(error);
        }
    }
}


//---------- cách 2: create createAsyncThunk

export const getProductDetailApi = createAsyncThunk('productReducer/getProductDetailApi', async (id: string) => {
    const response = await http.get(`api/Product/getbyid?id=${id}`)
    return response.data.content;
})