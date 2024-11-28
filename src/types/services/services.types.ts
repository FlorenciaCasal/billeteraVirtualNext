export type Service = {
    id: number;
    name: string;
    date: string;
};

export type ServiceDetails = Service & {
    invoice_value: string;
};