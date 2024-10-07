import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter your name")
    .min(3, "Name should be atleast 3 characters long.")
    .max(30, "Name should be at most 30 characters long.")
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .matches(
      /^[^\s]+(?:$|.*[^\s]+$)/,
      "Name name cannot start or end with space",
    )
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Only single space between words are allowed",
    ),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  message: Yup.string()
    .required("Please enter your message")
    .min(10, "Message should be atleast 10 characters long.")
    .max(500, "Message should be at most 500 characters long."),
});
