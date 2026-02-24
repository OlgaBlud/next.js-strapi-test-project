"use server";
import * as z from "zod";
import { subscribeService } from "./services";

import { FormStateType } from "../types";

const subscribeSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(
  prevState: FormStateType,
  formData: FormData,
) {
  console.log("Our first server action");
  const email = formData.get("email");
  const validatedFields = subscribeSchema.safeParse({ email });
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    // console.log("❌❌❌ Validation failed:");
    // console.dir(tree, { depth: null });
    // console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });
    return {
      ...prevState,
      zodErrors: tree.properties ?? null,
      strapiErrors: null,
      //
      errorMessage: null,
      successMessage: null,
    };
  }
  const responseData = await subscribeService(validatedFields.data.email);
  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      errorMessage: "An unexpected error occurred. Please try again later.",
      successMessage: null,
    };
  }
  if (responseData.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: responseData.error,
      errorMessage: "Failed to subscribe. Please try again.",
      successMessage: null,
    };
  }
  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: "Thank you for subscribing to our newsletter!",
  };
}
