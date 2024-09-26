import { cn } from "../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <div
      className={cn(
        "bg-lime-950 text-white py-2 px-3 rounded-3xl hover:bg-lime-800 transition-colors text-sm cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
