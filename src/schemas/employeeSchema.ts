import { z } from "zod";
// Zod schema
export const employeeSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[A-ÿ]{2,}[A-ÿ\-\s]*$/, {
      message: "The first name must contain only letters",
    }),
  lastName: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[A-ÿ]{2,}[A-ÿ\-\s]*$/, {
      message: "The last name must contain only letters",
    }),

  dateOfBirth: z.coerce
    .date()
    .min(new Date("1920-01-01"), {
      message: "Date cannot go past January 1 1920",
    })
    .max(new Date(), { message: "Date must be in the past" })
    .refine(
      (date) => {
        const ageDifMs = Date.now() - date.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age >= 18;
      },
      { message: "The employee must be 18 years or older" }
    ),
  startDate: z.coerce
    .date()
    .min(new Date("2000-01-01"), {
      message: "Date cannot go past January 1 2000",
    })
    .max(new Date(), { message: "Date must be in the past" }),
  street: z.string().min(5).max(50),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  zipCode: z
    .number({ invalid_type_error: "Zip code cannot exceed 5-digits" })
    .min(501)
    .max(99950),
  department: z.string().min(2).max(80),
});

// Single Employee
export type EmployeeType = z.infer<typeof employeeSchema>;
// Array of Employees
export type EmployeesType = EmployeeType[];
