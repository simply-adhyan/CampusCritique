import axios from 'axios';

const sendPostRequest = async (data) => {
  const url = 'http://localhost:3000/login';
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default sendPostRequest;
