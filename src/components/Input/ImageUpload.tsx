import clsx from "clsx";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  useCallback,
} from "react";
import { FiEdit } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";

interface ImageUploadProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange" | "value" | "type"
  > {
  value?: File | null;
  onChange?: (_image: File | null) => void;
  emptyLabel?: string;
  editLabel?: string;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      id,
      className,
      onChange,
      value = null,
      disabled = false,
      emptyLabel = "Upload an image",
      editLabel = "Change image",
      ...props
    },
    ref
  ) => {
    const handleKeyEnter = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !disabled) {
          (e.currentTarget.querySelector("input") as HTMLInputElement)?.click();
        }
      },
      [disabled]
    );

    const handleImageChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange((e.target.files && e.target.files[0]) || null);
        }
      },
      [onChange]
    );

    return (
      <div
        tabIndex={0}
        onKeyDown={handleKeyEnter}
        className={clsx(
          "group aspect-square overflow-clip rounded-full transition-colors duration-200",
          {
            "bg-neutral-700/40 text-neutral-300": !disabled,
            "bg-neutral-500 text-neutral-200": disabled,
            "hover:border-secondary-400 hover:text-secondary-400":
              !value && !disabled,
          },
          className
        )}
      >
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            className="aspect-square w-full object-cover object-center"
          />
        ) : null}

        <label
          htmlFor={id}
          className={clsx(
            "absolute top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-full text-sm transition-all duration-200 md:text-base",
            {
              "hover:cursor-pointer": !disabled,
              "opacity-0": value,
              "group-hover:bg-neutral-900/75 group-hover:text-white group-hover:opacity-100":
                value && !disabled,
            }
          )}
        >
          <input
            type="file"
            accept="image/*"
            id={id}
            ref={ref}
            disabled={disabled}
            className="invisible h-0"
            onChange={handleImageChange}
            {...props}
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
      </div>
    );
  }
);

export default ImageUpload;
