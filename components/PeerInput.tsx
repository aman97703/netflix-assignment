import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: "email" | "password" | "text";
  className?: string;
}

const PeerInput = ({
  id,
  label,
  value,
  onChange,
  type,
  className,
}: InputProps) => {
  return (
    <div className={cn("relative", className)}>
      <Input
        type={type || "text"}
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "border-[0.2px] border-white focus-visible:ring-0 focus-visible:ring-offset-0 block rounded-md px-6 py-7 w-full text-base text-white bg-neutral-900 appearance-none focus:outline-none focus:ring-0 peer"
        )}
        placeholder=""
      />
      <Label
        className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-[18px] z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
};

export default PeerInput;
