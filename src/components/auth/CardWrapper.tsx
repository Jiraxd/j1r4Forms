import { BackButton } from "./BackButton";
import { Social } from "./Social";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="card w-[400px] shadow-md text-primary-content bg-slate-600">
      <div className="card-body">
        <div className="card-title">
          <Header label={headerLabel} />
        </div>
        {children}
        {showSocial && (
          <div className="w-full">
            <Social></Social>
          </div>
        )}
        <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
      </div>
    </div>
  );
};
