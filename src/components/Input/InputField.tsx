import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from "react";

import { Shimmer } from "@/components";
import clsx from "clsx";

interface InputFieldProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | "aria-describedby"
    | "aria-errormessage"
    | "aria-required"
    | "aria-hidden"
    | "aria-invalid"
    | "type"
    | "id"
  > {
  type: Exclude<
    HTMLInputTypeAttribute,
    | "image"
    | "submit"
    | "button"
    | "reset"
    | "file"
    | "range"
    | "color"
    | "radio"
    | "checkbox"
  >;
  label: string;
  error?: string;
  description?: string;
  loading?: boolean;
  loadingFallback?: ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      className,
      error = "",
      description = "",
      loading = false,
      loadingFallback = null,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const fieldId = id + label?.replace(/\s+/g, "").toLowerCase() ?? "";

    return (
      <div className={clsx("flex flex-col gap-1 text-white", className)}>
        <label htmlFor={fieldId} className="text-sm">
          {label}
        </label>

        <Shimmer
          className="overflow-clip rounded-lg"
          fallback={loadingFallback}
          loading={loading}
        >
          <input
            {...props}
            ref={ref}
            id={fieldId}
            className={clsx(
              "w-full rounded-lg bg-neutral-700/40 p-2 text-sm focus:outline-white md:text-base",
              loading && "invisible",
              disabled && "bg-neutral-500 text-neutral-200"
            )}
            aria-describedby={description ? fieldId + "-descriptor" : undefined}
            aria-errormessage={error ? fieldId + "-error" : undefined}
            aria-invalid={Boolean(error)}
            aria-hidden={loading}
            aria-required={required}
            disabled={disabled}
            required={required}
          />
        </Shimmer>

        {description ? (
          <p
            id={fieldId + "-descriptor"}
            className="text-xs text-neutral-300 md:text-sm"
          >
            {description}
          </p>
        ) : null}
        {error ? (
          <p
            role="alert"
            id={fieldId + "-error"}
            className="text-xs text-error-400 md:text-sm"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

export default InputField;
