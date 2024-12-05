import httpJavaApi from "../common/http.java.service";
import { TransactionRequest } from "@/types/transactions/transactions.types";
import { TransactionResponse } from "@/types/transactions/transactions.types";

class TransactionAPI {
    getTransactionDetails = async (account_id: number, transaction_id: number, token: string): Promise<TransactionResponse> => {
        const endpoint = `/accounts/${account_id}/transactions/${transaction_id}`;
        return httpJavaApi.httpGet<TransactionResponse>(endpoint, undefined, token);
    };
    createTransaction = async (account_id: number, token: string, transactionData: TransactionRequest): Promise<TransactionResponse> => {
        const endpoint = `/accounts/${account_id}/transactions`; // POST request to create a transaction
        return httpJavaApi.httpPost<TransactionResponse>(endpoint, transactionData, token);
    };
}

const transactionApi = new TransactionAPI();
export default transactionApi;