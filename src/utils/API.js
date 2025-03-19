import axios from "axios";

export const loginApiCall = async (payload) => {
    try {
        const response = await axios.post(
            'https://bookstore.incubation.bridgelabz.com/bookstore_user/login',
            payload
        );

        // Check and store token
        const token = response.data.result.accessToken ;
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token stored:', token);
        } else {
            console.log('No token found in response');
        }
        
        const userName = response.data.result?.fullName || 
        response.data.fullName || 
        payload.email.split('@')[0];
        if (userName) {
            localStorage.setItem('userName', userName);
            console.log('Username stored:', userName);
        } else {
            console.log('No username found in response');
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error.message);
        console.error('Error details:', error.response?.data);
        throw error;
    }
};

export const signupApiCall = async (payload) => {
    try {
        const response = await axios.post(
            'https://bookstore.incubation.bridgelabz.com/bookstore_user/registration',
            payload
        );
        console.log('Full signup response:', response); // Log the entire response
        console.log('Signup response data:', response.data);

        // Check and store token (if your signup returns one)
        const token = response.data.result?.token || response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token stored:', token);
        } else {
            console.log('No token found in signup response (this might be normal)');
        }

        // Check and store username
        const userName = response.data.result?.fullName || 
        response.data.fullName || 
         payload.email.split('@')[0];
        if (userName) {
            localStorage.setItem('userName', userName);
            console.log('Username stored:', userName);
        } else {
            console.log('No username found in response');
        }

        return response.data;
    } catch (error) {
        console.error('Signup error:', error.message);
        console.error('Error details:', error.response?.data);
        throw error;
    }
};


export const getAllBooks = async () => {
    try {
      const response = await axios.get(
        'https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book'
      );
      return response.data.result;
    } catch (error) {
      console.error('Failed to fetch books:', error);
      throw error;
    }
  };

  export const getBookReviews = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.get(
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
      console.error("Failed to fetch feedback:", error);
      throw error;
    }
  };



  export const addBookReviews = async (comment, rating, bookId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${bookId}`,
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
        console.error("Adding Reviews Failed", error);
        throw error;
    }
};


export const addWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${bookId}`,
            { bookId },
            {
                headers: {
                    "x-access-token": token,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.result;
    } catch (error) {
        console.error("Wishlist Adding Failed", error);
        throw error;
    }
};


export const removeWishlist = async (bookId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${bookId}`, {
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json"
            }
        });

        return response.data.result;
    } catch (error) {
        console.error("Wishlist Removal Failed", error);
        throw error;
    }
};
