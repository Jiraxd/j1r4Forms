import { Moonicon, Sunicon } from "@/app/icons";

export const NavbarFormsUser = ({
  callback,
  theme,
}: {
  callback: Function;
  theme: String;
}) => {
  return (
    <div className="relative flex w-full justify-center">
      <div className="flex cursor-pointer gap-2 align-middle items-center bg-gray-700 rounded-b-[32px] px-16 py-4">
        <Moonicon color={"white"} />
        <input
          type="checkbox"
          value="light"
          className="toggle theme-controller"
          defaultChecked={theme === "light"}
          onClick={() => {
            callback(theme === "dark" ? "light" : "dark");
          }}
        />
        <Sunicon color={"white"} />
      </div>
    </div>
  );
};
