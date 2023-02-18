import axios from "axios";
const token = localStorage.getItem("token");

export const getLoggedInSeller = async (params, paramsToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/seller/${params.sellerId}`,
      {
        params: { token: token ? token : paramsToken },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addBook = async (params, bookName, bookCount) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/seller/${params.sellerId}/books/new`,
      {
        name: bookName,
        count: bookCount ? bookCount : null,
        token,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getSellerOrders = async (params, paramsToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/seller/${params.sellerId}/orders`,
      {
        params: { token: paramsToken },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
