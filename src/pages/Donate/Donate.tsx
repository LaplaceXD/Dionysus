import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useCallback, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Field, ImageUpload, Shimmer } from "@/components";
import { z } from "zod";

const donationFormSchema = z.object({
  profileImg: z.any(),
  name: z.string().min(2).max(64),
  email: z.string().email(),
  quote: z.string().min(2).max(128),
  card: z.object({
    number: z.string().nonempty(),
    holder: z.string().nonempty(),
    expiry: z.date({ coerce: true }),
    cvv: z
      .number({ coerce: true })
      .min(100, "Invalid CVV number.")
      .max(999, "Invalid CVV number."),
  }),
  amount: z.number({ coerce: true }),
});

type DonationFormSchema = z.infer<typeof donationFormSchema>;

function Donate() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DonationFormSchema>({
    resolver: zodResolver(donationFormSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = useCallback<SubmitHandler<FieldValues>>(() => {
    setLoading(true);

    setTimeout(() => {
      reset();
      setLoading(false);
    }, 5000);
  }, [reset, setLoading]);

  return (
    <div className="wrapper mt-16 grid  grid-cols-12 items-center gap-y-16 pb-8 md:mt-8 md:gap-12">
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
                <ImageUpload
                  {...field}
                  className="row-span-2 w-48 justify-self-center md:w-64"
                  error={error?.message}
                  disabled={loading}
                  loading={loading}
                />
              )}
            />

            <Field
              id="name"
              label="Name"
              description="This is the name that would be displayed on the donators section."
              error={errors.name?.message?.toString()}
              render={(field) => (
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("name")}
                    {...field}
                    type="text"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("email")}
                    {...field}
                    type="email"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("quote")}
                    {...field}
                    type="text"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
              error={errors.card?.number?.message?.toString()}
              className="sm:col-span-2"
              render={(field) => (
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("card.number")}
                    {...field}
                    type="text"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("card.holder")}
                    {...field}
                    type="text"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="card-expiry"
              label="Date of Expiry"
              error={errors.card?.expiry?.message?.toString()}
              render={(field) => (
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("card.expiry")}
                    {...field}
                    type="month"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
                  />
                </Shimmer>
              )}
            />
            <Field
              id="card-cvv"
              label="CVV"
              error={errors.card?.cvv?.message?.toString()}
              render={(field) => (
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("card.cvv")}
                    {...field}
                    type="number"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
                <Shimmer className="overflow-clip rounded-lg" loading={loading}>
                  <input
                    {...register("amount")}
                    {...field}
                    type="number"
                    className={clsx("field", loading && "invisible")}
                    disabled={loading}
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
                disabled={loading}
              >
                Clear
              </button>
            </li>
            <li className="flex-1">
              <button
                type="submit"
                className={clsx(
                  "btn btn-primary w-full justify-center",
                  loading && "gradient-shimmer animate-shimmer"
                )}
                disabled={loading}
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
