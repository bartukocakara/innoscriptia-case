import HttpService from "./HttpService"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DeleteData = async (url, id = null, fields = null, message = 'Delete Successful') => {
        const http = new HttpService();
        let newId = id !== null ? '/'+id : '' 
        let uri = url + newId;
        const token = "token";
        return http.deleteData( uri, token, fields).then(data => {
            const statusCode = data.status;
            if (statusCode === 204) {
                toast.success(message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
            } else if(statusCode === 422) {
                toast.error("Selected datas are not valid or preferences already clean !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }else {
                alert('Internal Server Error');
            }
            return data;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}