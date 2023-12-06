import HttpService from "./../HttpService"
import 'react-toastify/dist/ReactToastify.css';
import authRoutes from '../../config/api-routes/auth.json'

export const SignUpService = async (credentials, navigate) =>{
    const http = new HttpService();
    let loginUrl = authRoutes.register;
    try {
        const response = await http.postData(credentials, loginUrl);
        if (response.statusCode === 200) {
            var token = response.result.access_token
            var user = response.result.user
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => {
                navigate('/articles')
            }, 1500)
            return
        }
        return response
    } catch (error) {
      throw new Error(`Error calling LoginUser: ${error}`);
    }
}

export const LoginUser = async (credentials, navigate) => {
    const http = new HttpService();
    let loginUrl = authRoutes.login;
    try {
        const response = await http.postData(credentials, loginUrl);
        if (response?.statusCode === 200) {
            let token = response.result.access_token
            let user = response.result.user
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('preferences', JSON.stringify(user.preferences))
            setTimeout(() => {
                navigate('/articles')
            }, 1500)
            return
        }
        return response
    } catch (error) {
      throw new Error(`Error calling LoginUser: ${error}`);
    }
};

export const logoutUser = () =>{
    const http = new HttpService();
    let logoutUrl = "auth/logout";
    const tokenId = "token";
    return http.postData({}, logoutUrl, tokenId).then(data=>{
        return data;
    }).catch((error)=> {
        console.log(error)
        return error; 
    });
}

export const RefreshToken = () => {
    const http = new HttpService();
    let refreshTokenUrl = "auth/refresh-token"
    const tokenId = "token"
    return http.postData({}, refreshTokenUrl, tokenId).then(data => {
        return data;
    }).catch((error) => {
        console.log(error)
        return error;
    })
}