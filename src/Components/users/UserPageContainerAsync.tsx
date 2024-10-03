
import Link from "next/link";
import userApi from "@/services/users/users.service";
import { headers } from "next/headers";

type UserPageContainerProps = {
    user_id: number;
    token: string
}

const UserPageContainerAsync = async ({ user_id }: UserPageContainerProps) => {
    const headersList = headers();
    const token = headersList.get('digital-money-token'); // Obtén el token desde los encabezados

    console.log('user_id del uerPageContainerAsync antes del promise: ', user_id)

    const userPromise = userApi.getUserData(user_id, token || '');

    const [user] =
        await Promise.all([userPromise,
        ])

    console.log('user_id del uerPageContainerAsync despues', user_id)

    return <main className="flex flex-col bg-gray-100 p-8">
        <h2>
            <Link href="/profile" className="text-blue-500 hover:underline">
                Perfil
            </Link></h2>
        <h2 className="mb-1">
            {user.firstname}
        </h2>
        <div className="text-md mb-4 text-gray-600 cursor-pointer">
            @<Link href={`/users/${user_id}`}>{user.email}</Link>

        </div>
    </main>
}

export default UserPageContainerAsync;