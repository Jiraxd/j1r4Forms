import { auth } from "../../../../../auth";

const MainFormsPage = async() => {
    const session = await auth();
    return(
        <div>
        <span>Welcome back {session?.user?.name}!</span>
        </div>
    );
}

export default MainFormsPage;