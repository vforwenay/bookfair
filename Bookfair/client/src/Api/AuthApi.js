import axios from "axios";

export const SignUp = async (name, email, userType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/${userType}/new`,
      {
        name: name,
        email: email,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const LogIn = async (name, email, userType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/${userType}/login`,
      {
        name: name,
        email: email,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
