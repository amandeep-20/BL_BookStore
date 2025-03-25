import axios, { AxiosResponse } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

interface ReviewPayload {
  comment: string;
  rating: number;
}

interface ApiResponse<T> {
  result: T;
  token?: string;
  fullName?: string;
}

export const loginApiCall = async (payload: LoginPayload): Promise<any> => {
  try {
    const response: AxiosResponse<ApiResponse<{ accessToken: string; fullName?: string }>> = await axios.post(
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/login',
      payload
    );
    const token = response.data.result.accessToken;
    if (token) {
      localStorage.setItem('token', token);
    }
    
    const userName = response.data.result?.fullName || 
      response.data.fullName || 
      payload.email.split('@')[0];
    if (userName) {
      localStorage.setItem('userName', userName);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupApiCall = async (payload: SignupPayload): Promise<any> => {
  try {
    const response: AxiosResponse<ApiResponse<{ token?: string; fullName?: string }>> = await axios.post(
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/registration',
      payload
    );

    const token = response.data.result?.token || response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    const userName = response.data.result?.fullName || 
      response.data.fullName || 
      payload.email.split('@')[0];
    if (userName) {
      localStorage.setItem('userName', userName);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBooks = async (): Promise<any[]> => {
  try {
    const response: AxiosResponse<ApiResponse<any[]>> = await axios.get(
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book'
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getBookReviews = async (bookId: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse<ApiResponse<any[]>> = await axios.get(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${bookId}`,
      {
        headers: {
          "x-access-token": token,
          "accept": "application/json"
        }
      }
    );

    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const addBookReviews = async (comment: string, rating: number, bookId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse<ApiResponse<any>> = await axios.post(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${bookId}`,
      { comment, rating },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const addWishlist = async (bookId: string): Promise<AxiosResponse> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse = await axios.post(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${bookId}`,
      { bookId },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeWishlist = async (bookId: string): Promise<AxiosResponse> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse = await axios.delete(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${bookId}`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        }
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getWishlist = async (token: string): Promise<any[]> => {
  try {
    const response: AxiosResponse<ApiResponse<any[]>> = await axios.get(
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items',
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
      }
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (productId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const response: AxiosResponse<any> = await axios.post(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${productId}`,
      {},
      {   
        headers: {
          "x-access-token": token,
          "accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItems = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const response: AxiosResponse<any> = await axios.get(
      'https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items',
      {
        headers: {
          "x-access-token": token,
          "accept": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (cartItemId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const response: AxiosResponse<any> = await axios.delete(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${cartItemId}`,
      {
        headers: {
          "x-access-token": token,
          "accept": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};