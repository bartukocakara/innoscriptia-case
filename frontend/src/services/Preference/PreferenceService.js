import HttpService from "../HttpService"

export const LoadPreferences = ( apiUrl, query={} ) => {
    const http = new HttpService();
    const tokenId = "token";
    query = { ...query };
    return http.getData(apiUrl, tokenId, query).then(data => {
        return data;
    }).catch((error) => {
        console.error(error);
        return error;
    });
}