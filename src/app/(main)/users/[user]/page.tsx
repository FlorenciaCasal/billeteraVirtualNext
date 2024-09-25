import UserPageContainerAsync from "@/services/users/UserPageContainerAsync";

const UserPage = async ({params}: {params: {id: number}}) => {
    return <UserPageContainerAsync user_id={params.id} />
}

export default UserPage;