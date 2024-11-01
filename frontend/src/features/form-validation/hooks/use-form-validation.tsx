import { useEffect, useState } from "react";
import useDebounce from "../../debounce/hooks/use-debounce";

interface iErrorObject {
  isValid: boolean;
  errorMessage?: string;
}

/*
This hook provides methods for validating form elements
*/
const useFormValidation = (value: any, type: string) => {
  const { debouncedValue } = useDebounce(value, 500);

  let [errorObj, setErrorObj] = useState<iErrorObject>({ isValid: true });

  const validateField = () => {
    setErrorObj((previousErrorObj: iErrorObject) => {
      console.log("getting called", value);
      console.log(!value || value.replace(" ", "") == "");

      switch (type) {
        case "name":
          if (!value || value.replace(" ", "") == "") {
            setErrorObj({
              isValid: false,
              errorMessage: "Please enter a name",
            });
            return errorObj;
          } else {
            setErrorObj({
              isValid: true,
              errorMessage: "",
            });
            console.log(errorObj);
            return errorObj;
          }

        default:
          return errorObj;
      }
    });
  };

  useEffect(() => {
    function isValid() {
      return validateField();
    }
    return isValid();
  }, [debouncedValue]);

  return {
    validateField,
    errorObj,
  };
};

export default useFormValidation;
