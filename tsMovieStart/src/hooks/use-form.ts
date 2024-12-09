/*
 왜 만들까 ? 회원가입에서도 사용하기 때문에 
*/
import { useEffect } from "react";
import { useState } from "react";
function useForm<T extends Record<string, any>>({
  initialValue,
  validate,
}: {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
  // Partial -> 모든 키를 optional 로 바꾼다 !
}) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState<Partial<Record<keyof T, string>>>({});

  const handleChangeInput = (name: keyof T, value: string) => {
    // value = event.target.value
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // name: value는 안 된다.
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  //
  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeInput(name, event.target.value);
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
