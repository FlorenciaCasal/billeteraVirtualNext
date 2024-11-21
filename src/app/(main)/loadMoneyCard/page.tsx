import LoadMoneyCard from '@/components/cards/LoadMoneyCard';
import { headers } from 'next/headers';
import userApi from '@/services/users/users.service';


const LoadMoneyCardPage = async () => {
    const token = headers().get('digital-money-token') ?? '';
    const me = await userApi.getMeInternal(token);
    return (
        <>
            <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
                <LoadMoneyCard token={token} me={me} />
            </main>
        </>
    )
}

export default LoadMoneyCardPage

