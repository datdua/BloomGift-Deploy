import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const GET_ACCOUNT = "GET_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE ACCOUNT";

const getAccountIDFromToken = () => {
    const token = localStorage.getItem('token'); 
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.accountID;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

export const getAccount = () => {
    return async (dispatch) => {
        try {
            const accountID = getAccountIDFromToken();
            const response = await axios.get(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/accounts/${accountID}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch({
                type: GET_ACCOUNT,
                payload: response.data
            });
            return response.data;
        } catch (error) {
            console.error("Fetch account failed:", error);
            return Promise.reject(error);
        }
    }
}

export const updateAccount = (accountRequest) => {
    return async (dispatch) => {
        try {
            const accountID = getAccountIDFromToken();
            const response = await axios.put(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/accounts/update-account/${accountID}`, accountRequest, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: response.data
            });
            return response.data;
        } catch (error) {
            console.error("Update account failed:", error);
            return Promise.reject(error);
        }
    }
}