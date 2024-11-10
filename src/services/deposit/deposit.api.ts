import httpJavaApi from "../common/http.java.service"; // Suponiendo que tienes este servicio HTTP base
import { ResponseDepositType } from "@/types/transactions/deposit.types";
class DepositAPI {
    public async makeDeposit(account_id: number, amount: number, dated: string, destination: string, origin: string, token: string): Promise<ResponseDepositType> {
        const endpoint = `/accounts/${account_id}/deposits`;
        const body = {
            amount,
            dated,
            destination,
            origin
        };  // Cuerpo que espera la API
        return httpJavaApi.httpPost(endpoint, body, token); // Pasa el token para autenticación
    }
}

const depositApi = new DepositAPI();
export default depositApi;
