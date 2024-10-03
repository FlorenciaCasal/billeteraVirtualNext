import userApi from '@/services/users/users.service';
import UserPageContainerAsync from '@/Components/users/UserPageContainerAsync';
import { headers } from 'next/headers';


const ProfilePage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    // const token = headers().get('digitalMoneyID') ?? '';
    if (!token) {
        console.error("en profilePage, token no encontrado en los headers");
        return <div>Error: No se pudo obtener la información del usuario.</div>;
    }
    const me = await userApi.getMeInternal(token);
    console.log('me en profilePage: ', me.user_id)
    return <UserPageContainerAsync user_id={me.user_id} token= {token} />
}

export default ProfilePage;
