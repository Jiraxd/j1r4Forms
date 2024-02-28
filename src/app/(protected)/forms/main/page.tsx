import { auth } from "../../../../../auth";
import { useRouter } from "next/navigation";

const MainFormsPage = async() => {
    const session = await auth();
    const router = useRouter();
    if(session === null) router.push("/");
    return(
        <div>
        <span>Welcome back {session?.user?.name}!</span>
        </div>
    );
}

export default MainFormsPage;