interface VuelidateInterface {
  $invalid: boolean;
  $ending: boolean;
  $dirty: boolean;
  $touch: () => void;
}

export const getValidationClass = (form: any, fieldName: string) => {
  const field = form[fieldName];
  let error = false;
  if (field) {
    error = field.$invalid && !field.$ending && field.$dirty;
    console.log(1);
  } else {
    console.log(2);
  }
  return {
    error,
  };
};

export const checkValidation = (form: VuelidateInterface) => {
  form.$touch();
  console.log(3);
  return form.$invalid;
};
