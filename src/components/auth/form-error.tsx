import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="p-3 rounded-md flex items-center gap-x-2 text-sm">
      <FaExclamationTriangle className="w-4 h-4 text-red-500" />
      <p className="text-red-500">{message}</p>
    </div>
  );
};
