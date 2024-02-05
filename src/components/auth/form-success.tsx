import { FaCheckSquare } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="p-3 rounded-md flex items-center gap-x-2 text-sm">
      <FaCheckSquare className="w-4 h-4 text-green-500" />
      <p className="text-green-500">{message}</p>
    </div>
  );
};
