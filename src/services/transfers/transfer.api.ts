import httpJavaApi from "../common/http.java.service"; // Suponiendo que tienes este servicio HTTP base
import { TransactionResponse } from "@/types/transactions/transactions.types";
import { TransferRequest } from "@/types/transactions/transactions.types";

class TransferAPI {
    makeTransfer = async (account_id: number, token: string, transferData: TransferRequest): Promise<TransactionResponse> => {
        const endpoint = `/accounts/${account_id}/transferences`;
        return httpJavaApi.httpPost<TransactionResponse>(endpoint, transferData, token);
    }

}

const transferApi = new TransferAPI();
export default transferApi;