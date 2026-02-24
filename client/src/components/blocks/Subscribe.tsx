"use client";

import { SubscribeProps } from "@/src/types";

export function Subscribe({
  title,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {
  return (
    <section className="newsletter container">
      <div className="newsletter__info">
        <h4>{title}</h4>
        <p className="copy">{content}</p>
      </div>
      <form className="newsletter__form">
        <input
          name="email"
          type="email"
          placeholder={placeholder}
          className={`newsletter__email`}
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
