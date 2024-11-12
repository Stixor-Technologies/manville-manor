import React, { ChangeEvent, FC, RefObject, useRef, useState } from "react";
import { ContractFormSchema } from "@/utils/formik-schema";
import { Field, Form, Formik, useFormikContext } from "formik";
import { Button } from "@/components/button";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Dropzone from "react-dropzone";
import moment, { Moment } from "moment";
import Image from "next/image";
import generatePDF, { Margin } from "react-to-pdf";
import { postContract } from "@/utils/api-calls";

interface ContractAgreementProps {
  bookingId: any;
  targetRef: RefObject<HTMLDivElement>;
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
  const [preview, setPreview] = useState(null);

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
  targetRef,
}) => {
  const [isPostingContract, setisPostingContract] = useState<boolean>(false);

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  const inputProps = {
    id: "dateClient",
    className: `w-full appearance-none bg-transparent text-2xl capitalize text-white outline-none cursor-pointer`,
    readOnly: true,
  };

  const submitContract = async () => {
    try {
      setisPostingContract(true);

      if (targetRef?.current) {
        const createPdf = await generatePDF(targetRef, {
          filename: "contract.pdf",
          method: "build",
        });

        const pdfBlob = createPdf.output("blob");
        const formData = new FormData();
        formData.append("files", pdfBlob);

        // const resp = await postContract(103, formData);
        // console.log("resp", resp);
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
          clientSignature: "",
          dateClient: "",
        }}
        onSubmit={submitContract}
        // validationSchema={ContractFormSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <>
            <Form className="flex flex-col gap-10">
              <div className="flex items-end gap-2 leading-none ">
                <span>Client Signature:</span>

                <SignatureDropzone
                  name="clientSignature"
                  hasError={!!errors.clientSignature}
                  isTouched={touched.clientSignature}
                  errorMessage={errors.clientSignature}
                />
              </div>

              <div className="flex items-end gap-2 leading-none ">
                <span>Date: </span>

                <div className="w-[22rem] border-b border-dashed border-white text-base text-black">
                  <Datetime
                    className="text-auto"
                    closeOnSelect
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
                disabled={isPostingContract}
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
