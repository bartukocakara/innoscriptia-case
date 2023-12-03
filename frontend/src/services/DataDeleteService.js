import HttpService from "./HttpService"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DeleteData = async (url, id = null, fields = null) => {
        const http = new HttpService();
        let newId = id !== null ? '/'+id : '' 
        let uri = url + newId;
        const token = "token";
        return http.deleteData( uri, token, fields).then(response => {
            const status_code = response.status;
            if (status_code === 204) {
                toast.success('Delete Successful', {
                        position: toast.POSITION.TOP_RIGHT
                    });
            }else {
                alert('Internal Server Error');
            }
            return response;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}