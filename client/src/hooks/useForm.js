import { useState } from "react";

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
      setError(error.message);
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
