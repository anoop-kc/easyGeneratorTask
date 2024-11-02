import { useEffect, useState } from "react";
import useDebounce from "../../debounce/hooks/use-debounce";
import { iErrorObject } from "../../../interfaces";

/*
This hook provides methods for validating form elements
*/
const useFormValidation = (
  value: any,
  type: string,
  valueReference?: string
) => {
  const { debouncedValue } = useDebounce(value, 500);
  const [errorMessages, setErrorMessages] = useState<iErrorObject[]>([]);
  const [touched, SetTouched] = useState(false);

  const validateField = () => {
    setErrorMessages(() => {
      const newErrors: iErrorObject[] = [];
      switch (type) {
        // validations for name
        case "name":
          if (!value || value.replace(" ", "") == "") {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "Please enter a name",
              },
            ]);
          } else if (/[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/.test(value)) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "Your name should not contain special characters",
              },
            ]);
          }
          return newErrors;

        // validations for email
        case "email":
          const emailRegex =
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

          if (!value || value.replace(" ", "") == "") {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "Please enter your email",
              },
            ]);
          } else if (!emailRegex.test(value)) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "Please enter a valid email",
              },
            ]);
          }
          return newErrors;

        // validations for password
        case "password":
          if (value.indexOf(" ") != -1) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "your password should not contain any spaces",
              },
            ]);
          } else if (!value || value.replace(" ", "") == "") {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage: "Please enter a password",
              },
            ]);
          } else if (value.length < 8) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage:
                  "your password should be at least 8 characters long",
              },
            ]);
          } else if (!/(?=.*?[A-Za-z])/.test(value)) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage:
                  "your password should contain at least one letter",
              },
            ]);
          } else if (!/(?=.*\d)/.test(value)) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage:
                  "your password should contain at least one number",
              },
            ]);
          } else if (!/(?=.[$@$!% #+=()\^?&])/.test(value)) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage:
                  "your password should contain at least one special character",
              },
            ]);
          }
          return newErrors;
        // confirm password validation
        case "confirmPassword":
          if (value != valueReference) {
            setErrorMessages([
              ...newErrors,
              {
                isValid: false,
                errorMessage:
                  "The typed password does not match with the password provided",
              },
            ]);
          }
          return newErrors;

        default:
          return newErrors;
      }
    });
  };

  useEffect(() => {
    function isValid() {
      return validateField();
    }
    if (touched) {
      return isValid();
    }
  }, [debouncedValue]);

  return {
    validateField,
    errorMessages,
    SetTouched,
    touched,
  };
};

export default useFormValidation;
