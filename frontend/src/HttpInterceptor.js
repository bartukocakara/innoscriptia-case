import fetchIntercept from 'fetch-intercept';
import { CreateData } from './services/DataCreateService';

const HttpInterceptor = (store) => {
  fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occurred during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: async function (response) {
        // Modify the response object
        if (response.status === 401) {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                try {
                    CreateData('auth/refresh', null).then((res)=>{
                        if(res.hasOwnProperty('statusCode') && res.statusCode === 201){
                            if(res.result?.access_token) {
                                localStorage.setItem('token', JSON.stringify(res.result.access_token))

                            }
                        } else
                            setTimeout(() => {
                                window.location.href = '/logout';
                            }, 2500)
                    },
                    error=>{
                        console.log(error.messages);
                        setTimeout(() => {
                            window.location.href = '/logout';
                        }, 2500)
                    })
                } catch (error) {
                    // Error occurred while refreshing token or retrying request
                    // Handle the error or log the user out
                    throw new Error('Failed to refresh access token');
                }
            } else {
                // No refresh token found, log the user out
                localStorage.clear();
                window.location.href = '/logout';
            }
        }
        return response;
    },

    responseError: function (error) {
      // Handle a fetch error
      return Promise.reject(error);
    },
  });
};

export default HttpInterceptor;
