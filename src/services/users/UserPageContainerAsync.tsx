
import Link from "next/link";
import userApi from "@/services/users/users.service";

type UserPageContainerProps = {
    user_id: number;
}

const UserPageContainerAsync = async ({ user_id }: UserPageContainerProps) => {
    console.log('console.log(user_id): ', user_id)
    const userPromise = userApi.getUserData(user_id);

    const [user] =
        await Promise.all([userPromise,
        ])

    console.log(user.user_id)

    return <main className="flex flex-col bg-gray-100 p-8">
        <h1>Perfil</h1>
        <h2 className="mb-1">
            {user.firstname}
        </h2>
        <div className="text-md mb-4 text-gray-600 cursor-pointer">
            @<Link href={`/users/${user.user_id}`}>{user.email}</Link>

        </div>
    </main>
}

export default UserPageContainerAsync;