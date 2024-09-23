import axios from "../../Axios/axios";
import {
    getBillIDSuccess,
    getBillSuccess,
  isError,
  isLoginFail,
  isLoginRequest,
  isLoginSuccess,
  isRequest,
  isSuccess,
  isUserFail,
  isUserRequest,
  isUserSuccess,
  logoutSuccess,
} from "../Reducer/UserReducer";

export const userLogin = (info) => async (dispatch) => {
  dispatch(isLoginRequest());
  try {
    const { data } = await axios.post("/signin", info);
    dispatch(isLoginSuccess(data));
  } catch (error) {
    dispatch(isLoginFail(error.response.data));
  }
};

export const isUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user");
    dispatch(isUserSuccess(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(isRequest());
  try {
    const { data } = await axios.get("/logout");
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(isError(error.response.data));
  }
};

export const uploadBill = (info)=>async(dispatch)=>{
    dispatch(isRequest())
    try {
        const {data} = await axios.post("/upload/bill",info);
        dispatch(isSuccess(data))
    } catch (error) {
         dispatch(isError(error.response.data))      
    }
}
export const getAllBill = ()=>async(dispatch)=>{
    dispatch(isRequest())
    try {
        const {data} = await axios.get("/get/bill");
        dispatch(getBillSuccess(data))
    } catch (error) {
        dispatch(isError(error.response.data))      
        
    }
}
export const getBillById = (id)=>async(dispatch)=>{
    dispatch(isRequest())

    try {
        const {data} = await axios.get(`/get/bill/${id}`)
        dispatch(getBillIDSuccess(data))
    } catch (error) {
        dispatch(isError(error.response.data))      
        
    }
}
export const deleteBill = (id)=>async(dispatch)=>{
  dispatch(isRequest())
  try {
    const {data} = await axios.get(`/delete/bill/${id}`);
    dispatch(isSuccess(data))
  } catch (error) {
    dispatch(isError(error.response.data))
  }
}