import { HttpBaseAPI } from "./http.service";

// const API_URL = 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_PUBLIC_ENDPOINT = '';

class HttpNextAPI extends HttpBaseAPI {
    constructor(){
       super(API_URL, API_PUBLIC_ENDPOINT)
    }
}

const httpNextApi = new HttpNextAPI();
export default httpNextApi;