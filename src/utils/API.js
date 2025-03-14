import axios from "axios";

export const loginApiCall = async (payload) => {
    try {
        console.log('Login hitttttttttttttttttttttttttt');
        const response = await axios.post(
            'https://bookstore.incubation.bridgelabz.com/bookstore_user/login',
            payload
        );
        console.log('Full login response:', response); // Log the entire response
        console.log('Response data:', response.data);

        // Check and store token
        const token = response.data.result?.token || response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token stored:', token);
        } else {
            console.log('No token found in response');
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