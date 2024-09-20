import { View, Text, ActivityIndicator,Image } from 'react-native'
import axios from 'axios';
import { loaderStyles } from '../commonStyle/globalStyle';
import { databaseURL } from '../../assets/firebaseConfig';

// const BASE_URL = 'https://jsonplaceholder.typicode.com';
 //const BASE_URL = 'http://192.168.1.121:4000/api';
const BASE_URL = databaseURL;


const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClient1 = axios.create({
  baseURL: BASE_URL,
  headers: {
     'Content-Type': 'multipart/form-data',
  },
});

// Define common API methods
const _get = (url, config = {}) => {
  return apiClient.get(url, config);
};

const _delete = (url, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

const _postCustom = (url, data = {}, config = {}) => {
  return apiClient1.post(url, data, config);
};

// Loader function
const _getloader = () =>{
    return (
      <View style={loaderStyles.loaderContainer}>
        <Image
          source={require("../../assets/loding.gif")}
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
}

// Export API methods
export { _get, _delete, _put, _post, _getloader, _postCustom };