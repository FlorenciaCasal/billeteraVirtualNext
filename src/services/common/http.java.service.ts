import { HttpBaseAPI } from "./http.service";


const API_URL = 'https://digitalmoney.digitalhouse.com/api';
const API_URL_SIN_API = 'https://digitalmoney.digitalhouse.com';
const API_PUBLIC_ENDPOINT = '';

class HttpJavaAPI extends HttpBaseAPI {
    constructor() {
        super(API_URL, API_PUBLIC_ENDPOINT, API_URL_SIN_API)
    }
}

const httpJavaApi = new HttpJavaAPI();
export default httpJavaApi;