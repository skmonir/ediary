import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "login", {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("webdiary_auth_token", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("webdiary_auth_token");
    }

    register(username, password) {
        return axios.post(API_URL + "register", {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("webdiary_auth_token", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('webdiary_auth_token'));
        if (user) {
            const decodedJwt = this.parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                this.logout();
            }
        } else {
            return null;
        }

        return user.userInfo;
    }

    getAuthToken() {
        const user = JSON.parse(localStorage.getItem('webdiary_auth_token'));

        if (user && user.accessToken) {
            return 'Bearer ' + user.accessToken;
        } else {
            return '';
        }
    }
}

export default new AuthService();