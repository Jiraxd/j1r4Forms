export const FormTitleUser = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div
      className="flex border-b-2 border-r-2 rounded-lg flex-col w-full bg-slate-600"
      style={{
        borderColor: "rgb(106,111,121)",
      }}
    >
      <div className="w-full p-6">
        <div className="text-3xl font-bold text-gray-300">{title}</div>
        <div className="text-lg text-gray-300 mt-4">{description}</div>
      </div>
    </div>
  );
};
