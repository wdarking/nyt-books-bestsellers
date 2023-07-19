import { ElementType, ReactNode } from "react";
import { Button } from "./ui/button";

type ErrorFeedbackRootProps = {
  children?: ReactNode;
};

function ErrorFeedbackRoot({ children }: ErrorFeedbackRootProps) {
  return (
    <div className="p-5 md:p-10 rounded-md bg-slate-200 text-foreground grid place-items-center text-center">
      {children}
    </div>
  );
}

type ErrorFeedbackContentProps = {
  title: string;
  description?: string;
  icon?: ElementType;
};

function ErrorFeedbackContent({
  title,
  description,
  icon: Icon,
}: ErrorFeedbackContentProps) {
  return (
    <>
      {Icon && <Icon className="w-8 h-8 text-foreground" />}
      <p className="text-foreground text-lg mt-3">{title}</p>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </>
  );
}

type ErrorFeedbackActionProps = {
  action: () => void;
  text: string;
};

function ErrorFeedbackAction({ action, text }: ErrorFeedbackActionProps) {
  return (
    <Button onClick={action} className="mt-3">
      {text}
    </Button>
  );
}

export const ErrorFeedback = {
  Root: ErrorFeedbackRoot,
  Content: ErrorFeedbackContent,
  Action: ErrorFeedbackAction,
};
