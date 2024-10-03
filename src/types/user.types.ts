import { FormRegister } from "./formData/formDataRegister.types"
import { FormRegisterData } from "./FormRegisterData"

export type UserType = FormRegister & {
	user_id: number,     
}


export type UserTypeConId = FormRegisterData & {
	user_id: number,     
}
