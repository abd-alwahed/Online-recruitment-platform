import { useRouter } from "next/router"
import { useAuthContext } from "../../contexts/AuthContext";

export default () => {
    const router = useRouter();
    const {user} = useAuthContext();

    if (!user) {
        router.push('/log-in');
    }
    router.push('/profile/'+user.profileDetail.id)
}