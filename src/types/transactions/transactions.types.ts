export type TransactionResponse = {
    account_id: number;
    amount: number;
    dated: string;
    description: string;
    destination: string;
    id: number;
    origin: string;
    type: string;
}

export type TransactionRequest = {
    amount: number;
    dated: string;
    description: string;
}

export type TransferRequest = {
    amount: number;
    dated: string;
    destination: string;
    origin: string;
}