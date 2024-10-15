import userApi from '@/services/users/users.service';
import UserPageContainerAsync from '@/Components/users/UserPageContainerAsync';
import { headers } from 'next/headers';
// import NombreUsuario from '@/Components/form/home/NombreUsuario';


const ProfilePage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    // const user = await userApi.getUserData(me.user_id, token);
    return <>
        <UserPageContainerAsync user_id={me.user_id} token={token} />
        {/* <NombreUsuario firstname={user.firstname} lastname={user.lastname} /> */}
    </>
}

export default ProfilePage;
