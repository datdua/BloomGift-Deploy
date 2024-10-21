import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const API_BASE_URL = 'https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api';

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

  export const paymentService = {
    confirmPayment: async (paymentID, bankName, paymentCode, addToast) => {
      const accountID = getAccountIDFromToken();
      
      if (!accountID) {
        throw new Error('User not authenticated');
      }
      try {
        const response = await axios.put(
          `${API_BASE_URL}/customer/payment/choose-payment`,
          {},
          {
            params: {
              accountID,
              paymentID,
              bankName,
              paymentCode
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
  
        if (response.status === 200) {
          addToast('Thanh toán thành công! Vui lòng chờ 5 - 10 phút để nhân viên chúng tôi xác nhận đơn hàng', { appearance: 'success', autoDismiss: true });
        } else {
          addToast(`Lỗi: ${response.data.message} khi xác nhận thanh toán. Vui lòng thử lại sau!`, { appearance: 'error', autoDismiss: true } );
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
      }
    }
  };
  
  export default paymentService;