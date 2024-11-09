/*
 왜 만들까 ? 회원가입에서도 사용하기 때문에 
*/
import { useEffect } from "react";
import { useState } from "react";
function useForm({ initialValue, validate }) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});

  const handleChangeInput = (name, value) => {
    // value = event.target.value
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // name: value는 안 된다.
    }));
  };

  const handleBlur = (name) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  //
  const getTextInputProps = (name) => {
    const value = values[name];
    const onChange = (event) => handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setError(newErrors);
  }, [validate, values]);

  return { values, error, touched, getTextInputProps };
}

export default useForm;
