import httpJavaApi from "../common/http.java.service";

export interface TransactionResponse {
    account_id: number;
    amount: number;
    dated: string;
    description: string;
    destination: string;
    id: number;
    origin: string;
    type: string;
}

class TransactionAPI {
    getTransactionDetails = async (account_id: number, transaction_id: number, token: string): Promise<TransactionResponse> => {
        const endpoint = `/accounts/${account_id}/transactions/${transaction_id}`;
        return httpJavaApi.httpGet<TransactionResponse>(endpoint, undefined, token);
    };
}

const transactionApi = new TransactionAPI();
export default transactionApi;