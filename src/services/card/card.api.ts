import httpJavaApi from "../common/http.java.service";
import { ResponseCardType } from "@/types/card/card.types";

class CardAPI {
    getCard = async (account_id: number, token: string): Promise<ResponseCardType[]> => {
        const endpoint = `/accounts/${account_id}/cards`;
        return httpJavaApi.httpGet(endpoint, undefined, token);
    }

    getCardDetails = async (account_id: number, card_id: number, token: string): Promise<ResponseCardType> => {
        const endpoint = `/accounts/${account_id}/cards/${card_id}`;
        return httpJavaApi.httpGet(endpoint, undefined, token);
    };

    createCard = async (account_id: number, token: string, cardData: {
        cod: number,
        expiration_date: string,
        first_last_name: string,
        number_id: number,
    }): Promise<ResponseCardType> => {
        const endpoint = `/accounts/${account_id}/cards`;
        return httpJavaApi.httpPost(endpoint, cardData, token);
    }

    deleteCard = async (account_id: number, card_id: number, token: string): Promise<Response> => {
        const endpoint = `/accounts/${account_id}/cards/${card_id}`;
        return await httpJavaApi.httpDelete(endpoint, token);
    }
}

const cardApi = new CardAPI();
export default cardApi;