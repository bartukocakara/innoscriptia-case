import axios from "axios";
import HttpService from "../services/HttpService";

export const fetchList = async (apiUrl, queryParams) => {
    const http = new HttpService();
    const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
    const url = http.url + apiUrl;
    const urlWithParams = new URL(url);

    if(queryParams){
        for (const param in queryParams) {
            urlWithParams.searchParams.set(param, queryParams[param]);
        }
    }
    
    const headers = {
        'Authorization': token,
    };
    try {
        const response = await axios.get(urlWithParams.toString(), { headers });
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            handleLogout();
        }
        
        console.error("Error fetching data:", error);
        throw error;
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/logout'; 
};
