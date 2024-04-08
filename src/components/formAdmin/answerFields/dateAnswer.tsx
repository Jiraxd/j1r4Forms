export const DateAnswer = ({
  field,
  formid,
}: {
  field: any;
  formid: string;
}) => {
  return (
    <div className="px-3">
      <input
        className="text-md text-gray-300  bg-slate-600 border-1.5 rounded-md"
        type="date"
      />
      <p className="pt-2 border-b-1 border-dotted border-gray-400"></p>
    </div>
  );
};
