interface EnterFormsProps {
  children: React.ReactNode;
}

export const CreateFormBTN = ({ children }: EnterFormsProps) => {
  const onClickHandle = () => {};

  return (
    <span onClick={onClickHandle} className="cursor-pointer">
      {children}
    </span>
  );
};
