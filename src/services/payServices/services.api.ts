import httpJavaApi from "../common/http.java.service";

class ServicesAPI {
    getservices = async () => {
        const endpoint = `/service`;
        return httpJavaApi.httpGetFromSecondary(endpoint);
    }
    searchServices = async (query: string) => {
        const endpoint = `/service`;
        const headers = { Query: query };
        return httpJavaApi.httpGetFromSecondary(endpoint, undefined, headers);
    };
     getServiceById = async(id: number) => {
        const endpointSuffix = `/service/${id}`;
        return httpJavaApi.httpGetFromSecondary(endpointSuffix, undefined);
    }
}

const servicesApi = new ServicesAPI();
export default servicesApi;