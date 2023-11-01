import { z } from "zod";

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//Définission du schéma de validation avec Zod

// "preference",
export const SignUpFormSchema = z.object({
  lastName: z.string().min(2, { message: "Obligatoire" }),
  firstName: z.string().min(2, { message: "Obligatoire" }),
  dateOfBirth: z.date(),
  startdate: z.date(),
  // states: z.optional(z.string()),
  // street: z.optional(z.string()),
  // code: z.optional(z.number()),
  // city: z.optional(z.string()),
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
