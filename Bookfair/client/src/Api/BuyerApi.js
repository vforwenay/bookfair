import axios from "axios";
const token = localStorage.getItem("token");

export const getLoggedInBuyer = async (params, paramsToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/buyer/${params.buyerId}`,
      {
        params: { token: token ? token : paramsToken },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSellers = async (paramsToken) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/sellers`, {
      params: { token: paramsToken },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const addOrder = async (bookId, sellerId, buyerId, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/buyer/${buyerId}/orders/new`,
      {
        bookId,
        sellerId,
        token,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrders = async (params) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/buyers/${params.buyerId}/orders`,
      {
        params: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSearchSeller = async (name) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/search/sellers?name=${name}`,
      {
        params: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSearchBook = async (name) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/search/books?name=${name}`,
      {
        params: { token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
