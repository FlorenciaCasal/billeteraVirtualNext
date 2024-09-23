
import Link from "next/link";
import userApi from "@/services/users/users.service";

type UserPageContainerProps = {
    id: number;
}

const UserPageContainerAsync = async ({ id }: UserPageContainerProps) => {
    console.log('console.log(id): ', id)
    const userPromise = userApi.getUserData(id);
     
    // const [user] =
    //     await Promise.all([userPromise,
    //     ])

      // Asegurarnos que el resultado de la API es serializable
      const [userRaw] = await Promise.all([userPromise]);

      // Transformamos el resultado en un objeto JSON serializable
      const user = JSON.parse(JSON.stringify(userRaw));
      console.log(user.id)

    return <main className="flex flex-col bg-gray-100 p-8">
        <h1>Perfil</h1>
        <h2 className="mb-1">
            {user.firstname}
        </h2>
        <div className="text-md mb-4 text-gray-600 cursor-pointer">
            @<Link href={`/users/${user.id}`}>{user.email}</Link>
            
        </div>
    </main>
}

export default UserPageContainerAsync;