import AddCards from '@/Components/cards/AddCards';
import Card from '@/Components/dashboard/Card';
import { headers } from 'next/headers';


const Cardspage = () => {
    const token = headers().get('digital-money-token') ?? '';
    return (
        <>
            <main className="flex-grow py-8 px-16 bg-[#EEEAEA]">
                <AddCards />
                <Card token={token} />

            </main>
        </>
    )
}

export default Cardspage