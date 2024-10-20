import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


// Function to extract accountID from JWT
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

export const createOrder = (formData, addToast) => {
    return async (dispatch) => {
        try {
            const accountID = getAccountIDFromToken();  // Assuming you're getting the account ID from the token
            const response = await axios.post(
                `https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/customer/order/create-order?accountID=${accountID}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            if (response.status === 200) {
                // Dispatch success action
                dispatch({
                    type: 'CREATE_ORDER_SUCCESS',
                    payload: response.data
                });
                // Show success toast
                addToast('Đơn hàng đã được tạo', { appearance: 'success', autoDismiss: true });
                return true;
            }
        } catch (error) {
            // Log the error and dispatch fail action
            console.error('Error creating order:', error);
            addToast('Lỗi khi tạo đơn hàng', { appearance: 'error', autoDismiss: true });
            dispatch({
                type: 'CREATE_ORDER_FAIL',
                payload: error.response ? error.response.data : error.message,
            });
            return false;
        }
    }
};

export const getOrder = ( addToast) => {
    return async (dispatch) => {
        const accountID = getAccountIDFromToken();
        try {
            const response = await axios.get(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/customer/order/history-order/${accountID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                dispatch({
                    type: 'GET_ORDER_SUCCESS',
                    payload: response.data
                });
                return response.data;
            }
        } catch (error) {
            // Log the error and dispatch fail action
            console.error('Error getting order:', error);
            addToast('Lỗi khi lấy đơn hàng', { appearance: 'error', autoDismiss: true });
            dispatch({
                type: 'GET_ORDER_FAIL',
                payload: error.response ? error.response.data : error.message,
            });
            return null;
        }
    }
};

export const getOrderDetail = (orderID, addToast) => {
    return async (dispatch) => {
      dispatch({ type: 'GET_ORDER_DETAIL_REQUEST' });
      try {
        const response = await axios.get(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/customer/order/get-order-by-id/${orderID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.status === 200) {
          dispatch({
            type: 'GET_ORDER_DETAIL_SUCCESS',
            payload: response.data
          });
          return response.data;
        }
      } catch (error) {
        console.error('Error getting order detail:', error);
        addToast('Lỗi khi lấy chi tiết đơn hàng', { appearance: 'error', autoDismiss: true });
        dispatch({
          type: 'GET_ORDER_DETAIL_FAILURE',
          payload: error.response ? error.response.data : error.message,
        });
      }
    }
  };

  export const calculateShippingFee = (storeIDs, specificAddress, deliveryProvince, deliveryDistrict, deliveryWard, addToast) => async (dispatch) => {
    try {
      const response = await axios.post(
        'https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/customer/order/calculate-cost-many-shop',
        {
          specificAddress,
          deliveryProvince,
          deliveryDistrict,
          deliveryWard
        },
        {
          params: storeIDs.reduce((acc, id, index) => ({
            ...acc,
            [`storeIDs`]: storeIDs 
          }), {}),
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          paramsSerializer: params => {
            // Custom serializer to ensure proper URL formatting
            const storeIDsParam = params.storeIDs.map(id => `storeIDs=${id}`).join('&');
            return storeIDsParam;
          }
        }
      );

      const shippingFee = response.data;
      dispatch({
        type: 'CALCULATE_SHIPPING_FEE_SUCCESS',
        payload: shippingFee
      });
      addToast('Tiền ship đã được tính toán', { appearance: 'success', autoDismiss: true });
      return shippingFee;
    } catch (error) {
      console.error('Error calculating shipping fee:', error);
      dispatch({
        type: 'CALCULATE_SHIPPING_FEE_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
      addToast('Lỗi khi tính toán tiền ship', { appearance: 'error', autoDismiss: true });
    }
  };