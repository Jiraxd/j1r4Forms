import { useRouter } from "next/navigation";

interface EnterFormsProps {
    children: React.ReactNode;
  }

export const EnterFormsBtn = ({children}: EnterFormsProps ) => {
    const router = useRouter();
    const onClickHandle = () => {
      router.push("/forms/main");
    };
  
    
    return (
      <span onClick={onClickHandle} className="cursor-pointer">
        {children}
      </span>
    );
}