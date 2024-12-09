import React, { ChangeEvent, FC, RefObject, useRef, useState } from "react";
import { ContractFormSchema } from "@/utils/formik-schema";
import { Field, Form, Formik, useFormikContext } from "formik";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Dropzone from "react-dropzone";
import moment, { Moment } from "moment";
import Image from "next/image";
import { postContract } from "@/utils/api-calls";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/contants";

interface ContractAgreementProps {
  bookingId: number;
  contractDate: string;
  clientSignature: string;
}

interface SignatureDropzoneProps {
  name: string;
  hasError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
}

const SignatureDropzone: FC<SignatureDropzoneProps> = ({
  name,
  isTouched,
  hasError,
  errorMessage,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [preview, setPreview] = useState<string>("");

  const allowedTypes = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  const processFile = (file: File | undefined) => {
    if (file && allowedTypes.includes(file.type)) {
      setFieldValue(name, file);
      setFieldTouched(name, true, false);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files?.[0];
    processFile(file);
  };

  return (
    <div className="relative w-[22rem] border-b border-dashed border-white">
      <Dropzone
        onDrop={(files) => {
          if (files && files[0]) {
            const file = files[0];
            processFile(file);
          }
        }}
      >
        {({ getRootProps }) => (
          <div {...getRootProps()} className="w-full">
            <div>
              <label htmlFor={name} className="cursor-pointer">
                {preview ? (
                  <Image
                    src={preview}
                    alt="client-signature"
                    width={200}
                    height={200}
                    className="mx-auto max-h-32 max-w-52 object-contain"
                  />
                ) : (
                  <span className="block cursor-pointer bg-white py-2 text-center text-4xl uppercase text-black">
                    DROP SIGNATURE
                  </span>
                )}
              </label>

              <Field
                name={name}
                id={name}
                value={undefined}
                type="file"
                accept=".svg, .png, .jpeg, .jpg"
                className="hidden"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(event)
                }
              />
            </div>
          </div>
        )}
      </Dropzone>

      {isTouched && hasError && (
        <p className="absolute mt-1 text-xs italic text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

const ContractAgreement: FC<ContractAgreementProps> = ({
  bookingId,
  contractDate,
  clientSignature,
}) => {
  const [isPostingContract, setisPostingContract] = useState<boolean>(false);
  const router = useRouter();
  console.log("clientSignature", clientSignature);
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  const inputProps = {
    id: "dateClient",
    className: `w-full appearance-none bg-transparent text-2xl capitalize text-white outline-none cursor-pointer`,
    readOnly: !!(contractDate && clientSignature),
  };

  const submitContract = async (values: any) => {
    console.log("values", values);
    try {
      setisPostingContract(true);
      const { clientSignature, dateClient } = values;

      const resp = await postContract(bookingId, clientSignature, dateClient);
      if (resp) {
        toast.success("Booking Updated Contract", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
        });

        router.replace(`/payment?bookingId=${bookingId}`);
      }
    } catch (error) {
      console.error("Error generating or uploading contract", error);
    } finally {
      setisPostingContract(false);
    }
  };

  return (
    <div className="mt-8 text-[1.375rem] text-white md:text-[2.25rem]">
      <Formik
        initialValues={{
          clientSignature: clientSignature || "",
          dateClient: contractDate || "",
        }}
        onSubmit={submitContract}
        validationSchema={ContractFormSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <>
            <Form className="flex flex-col gap-10">
              <div className="flex items-end gap-2 leading-none ">
                <span>Client Signature:</span>

                {clientSignature && contractDate ? (
                  // Display the existing signature if both are present
                  <div>
                    <Image
                      src={BASE_URL + clientSignature}
                      alt="client-signature"
                      width={200}
                      height={200}
                      className="mx-auto max-h-32 max-w-52 object-contain"
                    />
                  </div>
                ) : (
                  // Allow uploading if clientSignature or contractDate is missing
                  <SignatureDropzone
                    name="clientSignature"
                    hasError={!!errors.clientSignature}
                    isTouched={touched.clientSignature}
                    errorMessage={errors.clientSignature}
                  />
                )}
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Date: </span>

                <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                  <Datetime
                    className="text-auto"
                    closeOnSelect
                    value={contractDate ? moment(contractDate) : moment()}
                    inputProps={inputProps}
                    isValidDate={disablePastDt}
                    timeFormat={false}
                    dateFormat="DD-MMMM-YYYY"
                    onClose={(dateValue) => {
                      if (
                        dateValue &&
                        (typeof dateValue === "string" ||
                          moment.isMoment(dateValue))
                      ) {
                        setFieldValue("dateClient", moment(dateValue).toDate());
                      }
                    }}
                  />

                  {!!errors?.dateClient && touched?.dateClient && (
                    <p className="absolute mt-1 text-xs italic text-red-600">
                      {errors.dateClient}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Owner Signature:</span>

                <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                  <span className="block bg-white py-2 text-center text-4xl uppercase text-black">
                    Drop Signature
                  </span>
                </div>
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Date: </span>
                <div className="w-[22rem] border-b border-dashed border-white text-base text-black" />
              </div>
              <Button
                size={"md"}
                loading={isPostingContract}
                disabled={
                  isPostingContract || !!(contractDate && clientSignature)
                }
                className="mx-auto mt-4"
              >
                Submit Contract
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ContractAgreement;
