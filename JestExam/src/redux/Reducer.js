import { GET_PRODUCT_LIST } from "./ActionType"

const INITIAL_STATE = {
  productList:[]
}

export const mainReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_PRODUCT_LIST:
            //alert(JSON.stringify(action.productList));
            return {...state, productList: action.productList}
        default:
            return {...state};   
    }
}