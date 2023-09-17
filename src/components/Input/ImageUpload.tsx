import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useId,
} from "react";
import { FiEdit } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";

import { Shimmer } from "@/components";

interface ImageUploadProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | "aria-describedby"
    | "aria-errormessage"
    | "aria-required"
    | "aria-hidden"
    | "aria-invalid"
    | "onChange"
    | "value"
    | "type"
  > {
  value?: File | null;
  onChange?: (_image: File | null) => void | null;
  emptyLabel?: string;
  editLabel?: string;
  error?: string;
  description?: string;
  loading?: boolean;
  loadingFallback?: ReactNode;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      id,
      className,
      value = null,
      onChange = null,
      emptyLabel = "Upload an image",
      editLabel = "Change image",
      error = "",
      description = "",
      required = false,
      disabled = false,
      loading = false,
      loadingFallback = null,
      ...props
    },
    ref
  ) => {
    const uniquePrefix = useId();
    const fieldId = uniquePrefix + id?.replace(/\s+/g, "").toLowerCase() ?? "";
    const active = !disabled && !loading;

    const handleKeyEnter = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && active) {
          (
            e.currentTarget.querySelector("#" + fieldId) as HTMLInputElement
          )?.click();
        }
      },
      [fieldId, active]
    );

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        <Shimmer
          loading={loading}
          fallback={loadingFallback}
          tabIndex={0}
          onKeyDown={handleKeyEnter}
          className={clsx(
            "group aspect-square overflow-clip rounded-full transition-all duration-200",
            active
              ? "bg-neutral-700/40 text-neutral-300"
              : "bg-neutral-500 text-neutral-200",
            !value &&
              active &&
              "hover:border-secondary-400 hover:text-secondary-400"
          )}
        >
          {value && !loading ? (
            <img
              src={URL.createObjectURL(value)}
              className="aspect-square w-full object-cover object-center"
            />
          ) : null}

          <label
            htmlFor={fieldId}
            className={clsx(
              "absolute top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-full text-sm transition-all duration-200 md:text-base",
              loading && "invisible",
              active && "hover:cursor-pointer",
              value && "opacity-0",
              value &&
                active &&
                "group-hover:bg-neutral-900/75 group-hover:text-white group-hover:opacity-100"
            )}
          >
            <input
              accept="image/*"
              {...props}
              type="file"
              className="invisible h-0"
              ref={ref}
              id={fieldId}
              onChange={(e) => {
                onChange &&
                  onChange((e.target.files && e.target.files[0]) || null);
              }}
              aria-describedby={
                description ? fieldId + "-descriptor" : undefined
              }
              aria-errormessage={error ? fieldId + "-error" : undefined}
              aria-invalid={Boolean(error)}
              aria-hidden={loading}
              aria-required={required}
              disabled={disabled}
              required={required}
            />
            {value ? (
              <>
                <FiEdit className="h-6 w-6 md:h-8 md:w-8" />
                {editLabel}
              </>
            ) : (
              <>
                <LuUpload className="h-6 w-6 md:h-8 md:w-8" />
                {emptyLabel}
              </>
            )}
          </label>
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

export default ImageUpload;
