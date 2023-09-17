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
    const fieldId = id + label;

    return (
      <div className={clsx("text-white flex flex-col gap-1", className)}>
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
              "bg-trasparent border-[1px] focus:outline-white border-neutral-300 p-2 w-full rounded-lg text-sm md:text-base",
              loading && "invisible",
              disabled && "text-neutral-300 bg-neutral-600"
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
            className="text-xs md:text-sm text-neutral-300"
          >
            {description}
          </p>
        ) : null}
        {error ? (
          <p
            role="alert"
            id={fieldId + "-error"}
            className="text-xs md:text-sm text-error-400"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

export default InputField;
