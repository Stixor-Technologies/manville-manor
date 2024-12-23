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

export const BookingFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Please enter your name")
    .min(3, "Name should be atleast 3 characters long.")
    .max(30, "Name should be at most 30 characters long.")
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .matches(
      /^[^\s]+(?:$|.*[^\s]+$)/,
      "First name cannot start or end with space",
    )
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Only single space between words are allowed",
    ),
  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),
  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),
  routine: Yup.string().required("Please select a routine"),
  backDrop: Yup.string().required("Please select a routine"),
  date: Yup.string().required("Please select a desired date"),
  venue: Yup.string().required("Please select a venue"),
  package: Yup.string().required("Please select a Package"),
  catering: Yup.string().required("Please select a catering option"),
  floorOption: Yup.string().required("Please select a floor option"),
  message: Yup.string()
    .min(10, "Message should be atleast 10 characters long.")
    .max(500, "Message should be at most 500 characters long."),
  adultsCount: Yup.number()
    .required("Please specify the number of adults")
    .moreThan(0, "The number of adults must be greater than 0"),
  childsCount: Yup.number()
    .required("Please specify the number of children")
    .moreThan(0, "The number of children must be greater than 0"),
});

const FILE_SIZE = 5 * 1024 * 1024;
export const ContractFormSchema = Yup.object().shape({
  clientSignature: Yup.mixed()
    .required("Please add you signatures")

    .test("fileSize", "Image file should not exceed 5MB", function (value) {
      if (!value) return true;
      return value && value instanceof File && value?.size <= FILE_SIZE;
    }),

  dateClient: Yup.date().required("Please select a date"),
});
