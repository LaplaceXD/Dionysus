import { z } from "zod";
import { mod10 } from "./luhn";

export const donationFormSchema = z.object({
  profileImg: z
    .instanceof(File)
    .optional()
    .refine((img) => {
      return img ? /.(jpe?g|png)$/.test(img.name) : true;
    }, "Image must be a jpeg, jpg, or png.")
    .refine((img) => {
      const twoMB = 2 * 1024 * 1024;
      return img ? img.size <= twoMB : true;
    }, "Image must be less than or equal to 2MB."),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(64, "Name is too long, keep it to 64 characters.")
    .regex(
      /^[A-Za-z0-9\-_ ]+$/,
      "Name must only include alphanumeric characters, -, _, and spaces."
    )
    .trim()
    .transform((name) => name.replace(/\s+/g, " ")),

  email: z.string().email("Email is invalid.").trim(),

  quote: z.union([
    z
      .string()
      .min(2, "Quote must be at least 2 characters long.")
      .max(128, "Quote is too long, keep it under 128 characters.")
      .trim(),
    z.string().length(0),
  ]),

  card: z.object({
    number: z
      .string()
      .nonempty("Card Number is required.")
      .regex(/[0-9]+$/, "Card Number must contain digits only.")
      .length(16, "Card number is invalid.")
      .refine((n) => {
        return (n.startsWith("4") || n.startsWith("5")) && mod10(n);
      }, "Card Number is invalid."),
    holder: z.string().nonempty("Cardholder Name is required.").trim(),
    expiry: z
      .string()
      .nonempty("Date of Expiry is required.")
      .refine((e) => {
        const [year, month] = e.split("-");
        const input = new Date(
          parseInt(year || "1970"),
          parseInt(month || "01") - 1
        );
        const today = new Date();

        return new Date(today.getFullYear(), today.getMonth()) <= input;
      }, "Card must not be expired."),
    cvv: z
      .string()
      .nonempty("Security Code is required.")
      .regex(/[0-9]+$/, "Invalid Security Code.")
      .min(3, "Invalid Security Code.")
      .max(4, "Invalid Security Code."),
  }),

  amount: z
    .number({ coerce: true })
    .min(1, "You can only donate a minimum of P1"),
});
