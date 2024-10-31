import CreateCard from '@/Components/cards/CreateCard';
import { headers } from 'next/headers';
import { cookies } from 'next/headers'

const CreateCardPage = () => {
    const token = headers().get('digital-money-token') ?? '';
    const cookieStore = cookies();
    const account_idString = cookieStore.get('digitalMoneyAccountID')?.value;
    const account_id = Number(account_idString);

    return (
        < CreateCard token={token} account_id={account_id} />
    );
};

export default CreateCardPage;