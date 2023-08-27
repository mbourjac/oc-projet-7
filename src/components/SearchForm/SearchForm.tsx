import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchForm.module.scss';

type SearchFormProps = {
  handleRoomSearch: (searchQuery: string) => void;
};

export const SearchForm = ({ handleRoomSearch }: SearchFormProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [isInputModified, setIsInputModified] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setIsInputModified(true);
  };

  const handleSearchErase = () => {
    setSearchInput('');
    handleRoomSearch('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRoomSearch(searchInput);
    setIsInputModified(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="search"
        value={searchInput}
        onChange={handleInputChange}
        className={styles.input}
        aria-label="Rechercher"
      />
      <div className={styles.controls}>
        <button
          type="submit"
          disabled={!isInputModified || searchInput.trim() === ''}
          className={styles.button}
        >
          Rechercher
        </button>
        <button
          type="button"
          disabled={searchInput.trim() === ''}
          className={styles.button}
          onClick={handleSearchErase}
        >
          Effacer
        </button>
      </div>
    </form>
  );
};
