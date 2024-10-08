const initialState = {
    order: null,
    loading: false,
    error: null
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ORDER_DETAIL_REQUEST':
        return { ...state, loading: true, error: null, order: null };
      case 'GET_ORDER_DETAIL_SUCCESS':
        return { ...state, loading: false, error: null, order: action.payload };
      case 'GET_ORDER_DETAIL_FAILURE':
        return { ...state, loading: false, error: action.payload, order: null };
      default:
        return state;
    }
  };
  
  export default orderReducer;