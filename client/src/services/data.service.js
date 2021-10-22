import axios from 'axios';
import AuthService from './auth.service';

const BASE_URL = 'http://localhost:8080/api/';

class DataService {
    getData(url, params) {
        url = BASE_URL + url;

        let requestConfig = {
            'headers': {
                'Authorization': AuthService.getAuthToken()
            },
            'params': params
        };

        return axios.get(url, requestConfig).then(response => response.data);
    }

    postData(url, payload) {
        url = BASE_URL + url;

        let requestConfig = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': AuthService.getAuthToken()
            }
        };

        return axios.post(url, payload, requestConfig).then(response => response.data);
    }

    deleteData(url, data) {
        url = BASE_URL + url;

        let requestConfig = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': AuthService.getAuthToken()
            },
            'data': data
        };

        return axios.delete(url, requestConfig).then(response => response.data);
    }

    getAllCategories(params) {
        return this.getData('category/' + AuthService.getCurrentUser().username, params);
    }

    getNote(noteId) {
        return this.getData('note/' + noteId);
    }

    getAllNotes(params) {
        return this.getData('note/getNoteList', params);
    }

    searchAllNotes(params) {
        return this.postData('note/search', params);
    }

    saveNote(params) {
        return this.postData('note/createUpdate', params);
    }

    deleteNote(params) {
        return this.deleteData('note/delete', params);
    }

    saveCategory(params) {
        return this.postData('category/createUpdate', params);
    }

    deleteCategory(params) {
        return this.deleteData('category/delete', params);
    }
}

export default new DataService();