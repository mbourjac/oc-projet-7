import { FormEvent } from 'react';
import { useInput } from '../../hooks/use-input';
import {
  isRequired,
  isValidNumber,
  isValidPostcode,
} from '../../data/transportation/transportation.validation';
import { Input } from '../Input/Input';
import {
  IAddress,
  TransportationStrategies,
} from '../../data/transportation/transportation.types';
import styles from './TransportationForm.module.scss';

type TransportationFormProps = {
  transportationStrategies: TransportationStrategies;
  handleTransportationSearch: (destination: IAddress) => void;
};

export const TransportationForm = ({
  handleTransportationSearch,
}: TransportationFormProps) => {
  const {
    value: number,
    isValid: isNumberValid,
    hasError: hasNumberError,
    errorMessage: numberErrorMessage,
    handleValueChange: handleNumberChange,
    handleValueBlur: handleNumberBlur,
  } = useInput([isValidNumber]);
  const {
    value: street,
    isValid: isStreetValid,
    hasError: hasStreetError,
    errorMessage: streetErrorMessage,
    handleValueChange: handleStreetChange,
    handleValueBlur: handleStreetBlur,
  } = useInput([isRequired]);
  const {
    value: city,
    isValid: isCityValid,
    hasError: hasCityError,
    errorMessage: cityErrorMessage,
    handleValueChange: handleCityChange,
    handleValueBlur: handleCityBlur,
  } = useInput([isRequired]);
  const {
    value: postcode,
    isValid: isPostcodeValid,
    hasError: hasPostcodeError,
    errorMessage: postcodeErrorMessage,
    handleValueChange: handlePostcodeChange,
    handleValueBlur: handlePostcodeBlur,
  } = useInput([isValidPostcode]);

  let isFormValid = false;

  if (isNumberValid && isStreetValid && isCityValid && isPostcodeValid) {
    isFormValid = true;
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const destinationAddress: IAddress = {
      number,
      street,
      city,
      postcode,
    };

    handleTransportationSearch(destinationAddress);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <Input
          type="number"
          id="number"
          value={number}
          label="Numéro"
          hasError={hasNumberError}
          errorMessage={numberErrorMessage}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
        />
        <Input
          type="text"
          id="street"
          value={street}
          label="Rue*"
          hasError={hasStreetError}
          errorMessage={streetErrorMessage}
          onChange={handleStreetChange}
          onBlur={handleStreetBlur}
        />
        <Input
          type="text"
          id="city"
          value={city}
          label="Ville*"
          hasError={hasCityError}
          errorMessage={cityErrorMessage}
          onChange={handleCityChange}
          onBlur={handleCityBlur}
        />
        <Input
          type="number"
          id="postcode"
          value={postcode}
          label="Code Postal"
          hasError={hasPostcodeError}
          errorMessage={postcodeErrorMessage}
          onChange={handlePostcodeChange}
          onBlur={handlePostcodeBlur}
        />
      </div>
      <div className={styles.search}>
        <button disabled={!isFormValid} className={styles.submit}>
          Rechercher
        </button>
        <p className={styles.required}>*Champs requis</p>
      </div>
    </form>
  );
};
