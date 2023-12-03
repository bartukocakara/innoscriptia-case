import HttpService from "./HttpService"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { capitalizeFirstLetter } from "../utils/stringHandler";

export const CreateData = async (url, query = null) => {
        const http = new HttpService();
        const token = "token";
        return http.postData(query, url, token).then(data => {
            const statusCode = data.statusCode
            switch (statusCode) {
                case 201:
                    toast.success('Created Succesfully', {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    break;
                default:
                    const errors = data.result
                    const errorItems = Object.keys(errors).map( (key, i) => {
                        const errorKey = capitalizeFirstLetter(key.replaceAll("_", " "))
                        const error = typeof errors[key] === 'object' ? JSON.stringify(errors[key]) : errors[key];
                        return (
                            <li key={i}>
                                {errorKey}:<br/>
                                {error}
                            </li>
                          )
                    })
                    const errorList = () => {
                        return <ul>
                            {errorItems}
                        </ul>
                    }
                    toast.error(errorList, {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    break;
            }
            return data;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}

export const CreateFormData = async (url, query = null) => {
    const http = new HttpService();
    const token = "token";
    return http.postFormData(query, url, token).then(data => {
        const statusCode = data.statusCode
        switch (statusCode) {
            case 201:
                toast.success('Created Succesfully', {
                    position: toast.POSITION.TOP_RIGHT
                  });
                break;
            default:
                const errors = data.result
                const errorItems = Object.keys(errors).map( (key, i) => {
                    const errorKey = capitalizeFirstLetter(key.replaceAll("_", " "))
                    const error = typeof errors[key] === 'object' ? JSON.stringify(errors[key]) : errors[key];
                    return (
                        <li key={i}>
                            {errorKey}:<br/>
                            {error}
                        </li>
                      )
                })
                const errorList = () => {
                    return <ul>
                        {errorItems}
                    </ul>
                }
                toast.error(errorList, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                break;
        }
        return data;
    }).catch((error) => {
        console.error(error);
        return error;
    });
}