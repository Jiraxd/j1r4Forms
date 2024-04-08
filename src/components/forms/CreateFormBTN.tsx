interface EnterFormsProps {
    children: React.ReactNode;
  }

export const CreateFormBTN = ({children}: EnterFormsProps ) => {
    const onClickHandle = () => {
      // TODO: show form creation naming
    };
  
    
    return (
      <span onClick={onClickHandle} className="cursor-pointer">
        {children}
      </span>
    );
}