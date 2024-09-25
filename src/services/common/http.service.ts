import { URLSearchParams } from "url";
import { AccessDeniedError } from "./http.errors";

export class HttpBaseAPI {
    protected privateEndpoint: string;
    protected publicEndpointSuffix: string;

    constructor(privateEndpoint: string, publicEndpointSuffix: string) {
        this.privateEndpoint = privateEndpoint;
        this.publicEndpointSuffix = publicEndpointSuffix;
    }

    async httpGet<T>(endpointSuffix: string, params?: URLSearchParams, token?: string): Promise<T> {
        console.log(`Fetching URL: ${this.privateEndpoint}${endpointSuffix}`);
        const res = await fetch(`${this.privateEndpoint}${endpointSuffix}${params ? `?${params}` : ''}`, {
            cache: 'no-cache',
            headers: !token ? { 'Content-Type': 'application/json' } : {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText}`)
            throw new Error("Failed to retrieve: " + endpointSuffix);
        }
        return res.json();
    };


    async httpGetPublic<T>(endpointSuffix: string, params?: URLSearchParams): Promise<T> {
        return this.httpGet(`${endpointSuffix}`, params);
    }

    async httpPost<T>(endpointSuffix: string, body: object, token?: string): Promise<T> {
        const res = await fetch(`${this.privateEndpoint}${endpointSuffix}`, {
            method: 'POST',
            headers: !token ? { 'Content-Type': 'application/json' } : {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            console.log(`${res.status} - ${res.statusText}`)
            if (res.status === 401) {
                throw new AccessDeniedError("User has no access")
            }
            throw new Error("Failed to post: " + this.privateEndpoint + endpointSuffix)
        }
        // Verificar si la respuesta tiene contenido
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return res.json() as Promise<T>;  // Si la respuesta tiene un cuerpo JSON, retornarlo como T
        }

        // Si no hay contenido en la respuesta, lanzamos un error o devolvemos un valor por defecto
        return {} as T;  // Devolvemos un objeto vacío como T si no hay contenido
    }

    async httpPostPublic<T>(endpointSuffix: string, body: object): Promise<T> {
        return this.httpPost(`${endpointSuffix}`, body);
    }
}

