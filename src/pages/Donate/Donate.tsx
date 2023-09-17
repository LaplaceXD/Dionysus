import { ImageUpload, InputField } from "@/components";
import clsx from "clsx";
import { useState } from "react";

function Donate() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="wrapper grid grid-cols-12  items-center mt-16 md:mt-8 gap-y-16 pb-8 md:gap-12">
      <aside className="col-span-12 md:col-span-7">
        <form
          className="flex flex-col gap-4 md:gap-8"
          onSubmit={(e) => {
            e.preventDefault();

            // const formData = new FormData(e.currentTarget);
            // console.log(Object.fromEntries(formData.entries()));

            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              // e.currentTarget.reset();
              setImage(null);
            }, 5000);
          }}
        >
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            <ImageUpload
              className="row-span-2 w-48 md:w-64 justify-self-center"
              value={image}
              onChange={setImage}
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Name"
              type="text"
              description="This is the name that would be displayed on the donators section."
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Email"
              type="email"
              description="This will be used for verification purposes."
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Quote"
              type="text"
              description="Short quote to showcase."
              className="sm:col-span-2"
              disabled={loading}
              loading={loading}
            />
          </fieldset>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 bg-gradient-to-r from-secondary-500 to-primary-600 px-4 pb-6 rounded-lg">
            <legend className="col-span-2 font-bold text-white text-2xl my-2">
              Donation
            </legend>

            <InputField
              label="Card Number"
              type="text"
              className="sm:col-span-2"
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Cardholder Name"
              type="text"
              className="sm:col-span-2"
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Date of Expiration"
              type="date"
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="CVV"
              type="number"
              disabled={loading}
              loading={loading}
            />
            <InputField
              label="Amount"
              type="number"
              className="sm:col-span-2"
              disabled={loading}
              loading={loading}
            />
          </fieldset>

          <menu className="flex flex-col-reverse md:flex-row gap-2 mt-4 md:mt-0">
            <li className="flex-1">
              <button
                type="reset"
                className="btn btn-secondary justify-center w-full"
                disabled={loading}
              >
                Clear
              </button>
            </li>
            <li className="flex-1">
              <button
                type="submit"
                className={clsx(
                  "btn btn-primary justify-center w-full",
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

      <article className="flex flex-col gap-4 col-span-12 md:col-span-5 -order-1 md:order-1">
        <h1 className="font-bold text-gradient-primary text-5xl text-center md:text-left">
          Toss a coin?
        </h1>
        <p className="text-neutral-300 text-center md:text-left">
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
