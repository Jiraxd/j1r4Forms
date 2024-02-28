import { useEffect, useState } from "react";
import { auth } from "../../../auth"
import { LoginButton } from "../auth/LoginButton";
import { RegisterButton } from "../auth/RegisterButton";
import { EnterFormsBtn } from "./enterFormsBTN";
import { Session } from "next-auth";

export const LogReg = () => {
    const [session, setSession] = useState<null | Session | string>(null);
    useEffect(() =>{
    async function getSession() {
    const tmpsession = await auth();
    if(tmpsession === null) 
        setSession("none");
    else
        setSession(tmpsession);
    }
    getSession();
    }, []);
    if(session === null) return <div></div>;
    return(
        <>
        {session === "none" ? (
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
            <EnterFormsBtn>
                <button className="btn btn-primary w-32 mr-5">Enter Forms</button>
            </EnterFormsBtn>
        )}
        </>
    );
}