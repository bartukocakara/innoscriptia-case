import HttpService from "../HttpService"

export const LoadMeProfile = () => {
        const http = new HttpService();
        let showProfileUrl = "me/profile";
        const tokenId = "token";

        return http.getData(showProfileUrl, tokenId).then(data => {
            return data;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}