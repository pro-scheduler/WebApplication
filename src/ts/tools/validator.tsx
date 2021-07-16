export type Validation = {
  message: string;
  validation: Function;
};
export const handleValidation = (validation: Validation[], value: any, setMessage: Function) => {
  let valid = true;
  for (let i = 0; i < validation.length; i++) {
    valid = valid && validation[i].validation(value);
    if (!valid) {
      setMessage(validation[i].message);
      break;
    }
  }
  return valid;
};

export const minSings = (min: number) => (value: string) => value.length >= min;
export const maxSings = (max: number) => (value: string) => value.length <= max;
export const required = () => (value: any) => value !== undefined && value !== null && value !== '';
export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
