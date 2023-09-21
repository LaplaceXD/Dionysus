import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useMemo,
} from "react";

type InputControlledProps = Pick<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "aria-describedby" | "aria-errormessage" | "aria-invalid" | "id"
>;

interface FieldProps {
  id: string;
  render: (_field: InputControlledProps) => ReactNode;
  label?: string;
  className?: string;
  description?: string;
  error?: string;
}

function Field({
  id,
  render,
  label,
  className,
  description,
  error,
}: FieldProps) {
  const uniquePrefix = useId();
  const uniqueId = uniquePrefix + id;

  const fields = useMemo(() => {
    const fields: InputControlledProps = { id: uniqueId };

    if (description) {
      fields["aria-describedby"] = uniqueId + "-descriptor";
    }

    if (error) {
      fields["aria-errormessage"] = uniqueId + "-error";
      fields["aria-invalid"] = Boolean(error);
    }

    return fields;
  }, [uniqueId, description, error]);

  return (
    <div className={clsx("flex flex-col gap-1 text-white", className)}>
      {label ? (
        <label htmlFor={uniqueId} className="text-sm">
          {label}
        </label>
      ) : null}

      {render(fields)}

      {description ? (
        <p
          id={fields["aria-describedby"]}
          className="text-xs text-neutral-300 md:text-sm"
        >
          {description}
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          id={fields["aria-errormessage"]}
          className="text-xs text-error-400 md:text-sm"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
