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
