import { useRouter } from "next/navigation";

interface EnterSettingsProps {
  children: React.ReactNode;
}

export const EnterSettingsBTN = ({ children }: EnterSettingsProps) => {
  const router = useRouter();
  const onClickHandle = () => {
    router.push("/settings");
  };

  return (
    <span onClick={onClickHandle} className="cursor-pointer">
      {children}
    </span>
  );
};
