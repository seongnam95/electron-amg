import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

const useValidFormCheck = () => {
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const { isValid, dirty, values, errors, validateForm } = useFormikContext();

  useEffect(() => {
    const validateFormCheck = async () => {
      const validationErrors = await validateForm();
      if (isValid && dirty && !Object.keys(validationErrors).length) {
        setIsValidForm(true);
      } else setIsValidForm(false);
    };

    validateFormCheck();
  }, [values, errors]);

  return isValidForm;
};

export default useValidFormCheck;
