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
    const fieldId = uniquePrefix + id;

    const handleKeyEnter = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !disabled) {
          (
            e.currentTarget.querySelector("#" + fieldId) as HTMLInputElement
          )?.click();
        }
      },
      [fieldId, disabled]
    );

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        <Shimmer
          loading={loading}
          fallback={loadingFallback}
          tabIndex={0}
          role="button"
          onKeyDown={handleKeyEnter}
          className={clsx(
            "group aspect-square rounded-full overflow-clip transition-all duration-200",
            disabled
              ? "bg-neutral-500 text-neutral-200"
              : "bg-neutral-700/40 text-neutral-300",
            !value &&
              !disabled &&
              "hover:text-secondary-400 hover:border-secondary-400"
          )}
        >
          {value && !loading ? (
            <img
              src={URL.createObjectURL(value)}
              className="object-cover aspect-square w-full object-center"
            />
          ) : null}

          <label
            htmlFor={fieldId}
            className={clsx(
              "absolute flex flex-col justify-center items-center gap-2 w-full h-full top-0 rounded-full text-sm md:text-base transition-all duration-200",
              !disabled && "hover:cursor-pointer",
              value && "opacity-0",
              value &&
                !disabled &&
                "group-hover:bg-neutral-900/75 group-hover:opacity-100 group-hover:text-white"
            )}
          >
            <input
              accept="value/*"
              {...props}
              type="file"
              className="invisible h-0"
              ref={ref}
              id={fieldId}
              value={value?.name}
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
                <FiEdit className="w-6 h-6 md:w-8 md:h-8" />
                {editLabel}
              </>
            ) : (
              <>
                <LuUpload className="w-6 h-6 md:w-8 md:h-8" />
                {emptyLabel}
              </>
            )}
          </label>
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

export default ImageUpload;
