import { auth } from "../../../auth"
import { LoginButton } from "../auth/LoginButton";
import { RegisterButton } from "../auth/RegisterButton";

export const LogReg = async() => {
    const session = await auth();
    console.log(session);
    return(
        <>
        {session === null ? (
            <>
                 <LoginButton>
            <button className="btn btn-primary btn-outline w-32 mr-5">
              Log In
            </button>
          </LoginButton>
          <RegisterButton>
            <button className="btn btn-primary w-32 mr-5">Sign Up</button>
          </RegisterButton>
                </>
        ) : (
            <div>
                
            </div>
        )}
        </>
    );
}