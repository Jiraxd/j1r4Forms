import { useEffect, useState } from "react";
import { auth } from "../../../auth"
import { LoginButton } from "../auth/LoginButton";
import { RegisterButton } from "../auth/RegisterButton";
import { EnterFormsBtn } from "./enterFormsBTN";
import { Session } from "next-auth";

export const LogReg = () => {
    const [session, setSession] = useState<null | Session>(null);
    useEffect(() =>{
    async function getSession() {
     const tmpsession = await auth();
     if(tmpsession !== null) setSession(tmpsession);
    }
    getSession();
    }, []);
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
            <EnterFormsBtn>
                <button className="btn btn-primary w-32 mr-5">Enter Forms</button>
            </EnterFormsBtn>
        )}
        </>
    );
}