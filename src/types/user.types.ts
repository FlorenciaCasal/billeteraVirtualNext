import { FormRegister } from "./formData/formDataRegister.types"
import { FormRegisterData } from "./FormRegisterData"

export type UserType = FormRegister & {
	user_id: number,
}


export type UserTypeConId = {
	account_id: number;
	email: string;
	user_id: number
}
