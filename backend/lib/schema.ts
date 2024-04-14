import z from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(5, { message: "Name must be greater than 5 characters long" })
    .max(20, { message: "Name must be less than 20 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be greater than 8 characters long" }),
});

const productSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be greater than 3 characters long" })
    .max(20, { message: "Name must be less than 20 characters long" }),
  price: z.string({
    required_error: "Price is required",
  }),
  imageUrl: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Invalid image URL",
    })
    .url({ message: "Invalid image URL format" }),
});
