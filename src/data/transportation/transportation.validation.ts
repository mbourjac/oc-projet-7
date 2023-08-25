export const isRequired = {
  validate: (value: string) => value.trim() !== '',
  errorMessage: 'Ce champ est requis',
};

export const isValidNumber = {
  validate: (value: string) => value === '' || parseFloat(value) > 0,
  errorMessage: 'Veuillez renseigner un chiffre supérieur à 0',
};

export const isValidPostcode = {
  validate: (value: string) => value === '' || /^\d{5}$/.test(value),
  errorMessage: 'Veuillez renseigner 5 chiffres',
};
