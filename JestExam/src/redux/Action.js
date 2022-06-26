import { GET_PRODUCT_LIST } from "./ActionType";

export const updateProductList = (productList) => {
    return (dispatch) => {
        dispatch({type: GET_PRODUCT_LIST, productList: productList})
    }
}