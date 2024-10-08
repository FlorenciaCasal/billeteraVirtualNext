import userApi from '@/services/users/users.service';
import UserPageContainerAsync from '@/Components/users/UserPageContainerAsync';
import { headers } from 'next/headers';


const ProfilePage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    return <UserPageContainerAsync user_id={me.user_id} token= {token} />
}

export default ProfilePage;
