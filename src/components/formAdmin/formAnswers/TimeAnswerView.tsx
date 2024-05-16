export const TimeAnswerView = ({ answer }: { answer: any }) => {
  return (
    <div className="px-3">
      <p className="text-md text-gray-300">{answer}</p>
      <p className="pt-2 border-b-1 border-dotted border-gray-400"></p>
    </div>
  );
};
