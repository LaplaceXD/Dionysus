import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ChangeEvent, FocusEvent, useCallback } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Field, ImageUpload, Shimmer } from "@/components";
import { donationFormSchema } from "@/pages/Donate/validators";

function Donate() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: 1,
    },
  });

  const handleFormSubmit = useCallback<SubmitHandler<FieldValues>>(() => {
    toast.promise(
      async () => {
        /* 5 seconds delay */
        await new Promise((resolve) => setTimeout(resolve, 5000));
        reset();
      },
      {
        pending: "Tossing a coin...",
        success: "Thank you, Witcher! 👌",
        error: "Coin was not received. 😭",
      }
    );
  }, [reset]);

  return (
    <div className="wrapper mt-16 grid grid-cols-12 items-center gap-y-16 pb-8 md:mt-8 md:gap-12">
      <aside className="col-span-12 md:col-span-7">
        <form
          className="flex flex-col gap-4 md:gap-8"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <fieldset className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3">
            <Controller
              name="profileImg"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Field
                  id="profileImg"
                  error={error?.message}
                  className="row-span-2 w-full max-w-xs justify-self-center"
                  render={(fieldProps) => (
                    <Shimmer
                      loading={isSubmitSuccessful}
                      className="overflow-clip rounded-full"
                    >
                      <ImageUpload
                        {...field}
                        {...fieldProps}
                        disabled={isSubmitSuccessful}
                      />
                    </Shimmer>
                  )}
                />
              )}
            />

            <Field
              id="name"
              label="Name"
              description="This is the name that would be displayed on the donators section."
              error={errors.name?.message?.toString()}
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("name")}
                    {...field}
                    type="text"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="email"
              label="Email"
              description="This will be used for verification purposes."
              error={errors.email?.message?.toString()}
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("email")}
                    {...field}
                    type="email"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="quote"
              label="Quote"
              description="Showcase a short quote."
              error={errors.quote?.message?.toString()}
              className="sm:col-span-2"
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("quote")}
                    {...field}
                    type="text"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
          </fieldset>

          <fieldset className="grid grid-cols-1 gap-2 rounded-lg bg-gradient-to-r from-secondary-500 to-primary-600 px-4 pb-6 sm:grid-cols-2 md:gap-3">
            <legend className="col-span-2 my-2 text-2xl font-bold text-white">
              Donation
            </legend>

            <Field
              id="card-number"
              label="Card Number"
              description="Only accepts VISA (4111111111111111) or MasterCard (5555555555554444)."
              error={errors.card?.number?.message?.toString()}
              className="sm:col-span-2"
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("card.number")}
                    {...field}
                    type="text"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="card-holder"
              label="Cardholder Name"
              error={errors.card?.holder?.message?.toString()}
              className="sm:col-span-2"
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("card.holder")}
                    {...field}
                    type="text"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="card-expiry"
              label="Date of Expiry"
              error={errors.card?.expiry?.message?.toString()}
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("card.expiry")}
                    {...field}
                    type="month"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="card-cvv"
              label="CVV"
              error={errors.card?.cvv?.message?.toString()}
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("card.cvv", {
                      onChange(e: ChangeEvent<HTMLInputElement>) {
                        setValue("card.cvv", e.currentTarget.value.slice(0, 4));
                      },
                    })}
                    {...field}
                    type="number"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="amount"
              label="Amount"
              error={errors.amount?.message?.toString()}
              className="sm:col-span-2"
              render={(field) => (
                <Shimmer
                  className="overflow-clip rounded-lg"
                  loading={isSubmitSuccessful}
                >
                  <input
                    {...register("amount", {
                      onBlur(e: FocusEvent<HTMLInputElement, Element>) {
                        const val: string = e.currentTarget.value;

                        if (val.includes(".")) {
                          const [int, frac] = val.split(".");

                          setValue(
                            "amount",
                            parseFloat(int + "." + (frac?.slice(0, 2) ?? ""))
                          );
                        }
                      },
                    })}
                    {...field}
                    step="any"
                    type="number"
                    className="field"
                    disabled={isSubmitSuccessful}
                  />
                </Shimmer>
              )}
            />
          </fieldset>

          <menu className="mt-4 flex flex-col-reverse gap-2 md:mt-0 md:flex-row">
            <li className="flex-1">
              <button
                type="reset"
                onClick={() => reset()}
                className="btn btn-secondary w-full justify-center"
                disabled={isSubmitSuccessful}
              >
                Clear
              </button>
            </li>
            <li className="flex-1">
              <button
                type="submit"
                className={clsx(
                  "btn btn-primary w-full justify-center",
                  isSubmitSuccessful && "gradient-shimmer animate-shimmer"
                )}
                disabled={isSubmitSuccessful}
              >
                Submit
              </button>
            </li>
          </menu>
        </form>
      </aside>

      <article className="-order-1 col-span-12 flex flex-col gap-4 md:order-1 md:col-span-5">
        <h1 className="text-gradient-primary text-center text-5xl font-bold md:text-left">
          Toss a coin?
        </h1>
        <p className="text-center text-neutral-300 md:text-left">
          Fuel the Festivities on Dionysus! Your donations keep the games
          lively, the music vibrant, and the revelry going strong. Join us in
          raising a digital toast to the spirit of Dionysus - your support makes
          every game night an unforgettable celebration!
        </p>
      </article>
    </div>
  );
}

export default Donate;
