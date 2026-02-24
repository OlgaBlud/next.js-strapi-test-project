"use client";

import { subscribeAction } from "@/src/data/actions";
import { FormStateType, SubscribeProps } from "@/src/types";
import { useActionState } from "react";

const INITIAL_FORM_STATE: FormStateType = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
};

export function Subscribe({
  title,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {
  const [formState, formAction] = useActionState<FormStateType, FormData>(
    subscribeAction,
    INITIAL_FORM_STATE,
  );
  console.log(formState, "this is our form state coming from useActionState");
  const zodErrors = formState?.zodErrors?.email?.errors[0];
  const strapiErrors = formState?.strapiErrors?.message;
  // console.log(zodErrors, "these are our zod errors");
  // console.log(strapiErrors, "these are our strapi errors");
  const errorMessage = strapiErrors || zodErrors || formState?.errorMessage;
  const successMessage = formState?.successMessage;
  return (
    <section className="newsletter container">
      <div className="newsletter__info">
        <h4>{title}</h4>
        <p className="copy">{content}</p>
      </div>
      <form className="newsletter__form" action={formAction}>
        <input
          name="email"
          type="text"
          placeholder={errorMessage || successMessage || placeholder}
          className={`newsletter__email ${errorMessage ? "newsletter__email--error" : ""}`}
        />
        <button
          type="submit"
          className="newsletter__subscribe btn btn--turquoise btn--medium"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}
