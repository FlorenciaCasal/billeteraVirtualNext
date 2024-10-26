import { FormRegister } from "./formData/formDataRegister.types"

export type UserType = FormRegister & {
	user_id: number,
}


export type UserTypeConId = {
	
		account_id: number;
		email: string;
		user_id: number
	
}

export type ResponseUserPatch = {
	firstname: string;
    lastname: string; 
    dni: number;
    email: string;
    password: string;
    phone: string;

}
