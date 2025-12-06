import { useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

export default function useForm(callback, initialState) {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const formAction = async () => {
    try {
      await callback(values);
      setError(null);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    }
  };

  const register = (fieldName) => {
    return {
      name: fieldName,
      onChange: changeHandler,
      value: values[fieldName],
    };
  };

  return {
    values,
    error,
    formAction,
    register,
  };
}
