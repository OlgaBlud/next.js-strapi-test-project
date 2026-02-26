"use server";
import * as z from "zod";
import {
  EventsSubscribeProps,
  eventsSubscribeService,
  subscribeService,
} from "./services";

import { EventsFormStateType, SubscribeFormStateType } from "../types";

const subscribeSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(
  prevState: SubscribeFormStateType,
  formData: FormData,
) {
  // console.log("Our first server action");
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

// subscribe to a specific Event
const eventsSubscribeSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .regex(
      /^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      {
        message: "Please enter a valid phone number",
      },
    ),
});

export async function eventsSubscribeAction(
  prevState: any,
  formData: FormData,
) {
  const formDataObject = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventId: formData.get("eventId"),
  };

  const validatedFields = eventsSubscribeSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      formData: {
        ...formDataObject,
      },
    };
  }

  const dataToSend: EventsSubscribeProps = {
    ...validatedFields.data,
    event: {
      connect: [formDataObject.eventId as string],
    },
  };

  const responseData = await eventsSubscribeService(dataToSend);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      formData: {
        ...formDataObject,
      },
      errorMessage: "Failed to Subscribe.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    formData: null,
    successMessage: "Successfully Subscribed!",
  };
}
