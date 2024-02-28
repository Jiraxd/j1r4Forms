import { Header } from "./header";
import { BackButton } from "./BackButton";
import { Spacer } from "@nextui-org/react";

export const ErrorCard = () => {
  return (
    <div className="card w-[400px] shadow-md">
      <div className="card-title">
        <Header label={"Something went wrong!"}></Header>
      </div>
      <Spacer y={20}></Spacer>
      <div className="card-actions">
        <BackButton label="Back to login" href="/auth/login"></BackButton>
      </div>
      <Spacer y={8}></Spacer>
    </div>
  );
};
