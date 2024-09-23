import userApi from '@/services/users/users.service';
import UserPageContainerAsync from '@/services/users/UserPageContainerAsync';
import { headers } from 'next/headers';


const ProfilePage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    return <UserPageContainerAsync id={me.id} />
}

export default ProfilePage;