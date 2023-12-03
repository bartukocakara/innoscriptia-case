import HttpService from "./HttpService"

export const LoadShowData = async (url, id = null, query = null) => {
        const http = new HttpService();
        const uri = id ? `${url}/${id}` : url;
        const token = "token";
        return await http.getData(uri, token, query).then(data => {
            return data;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}