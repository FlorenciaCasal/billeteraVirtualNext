
import userApi from '@/services/users/users.service';
import { createClient } from 'redis';
import { cookies } from 'next/headers';
import UserPageContainerAsync from '@/services/users/UserPageContainerAsync';

const client = createClient({
    url: 'redis://default:digitalMoneyPass@redis:6379'
});

client.connect().then(() => {
    console.log('connected to redis')
})

const ProfilePage = async () => {
    const cookieStore = cookies()
    const sessionId = cookieStore.get('digitalMoneyID')
    const accessToken = await client.get(sessionId?.value ?? '');

    if (!accessToken) return new Response(JSON.stringify({ error: 'Access denied' }), {
        status: 403,
    })

    const me = await userApi.getMeInternal(accessToken);
    
    const mePlain = JSON.parse(JSON.stringify(me)); // Asegurarse de que sea serializable

    return <UserPageContainerAsync id={mePlain.id} />
}

export default ProfilePage;