import styles from './StrategyButton.module.scss';

type StrategyButtonProps = {
  strategyKey: string;
  handleStrategySearch: (strategyKey: string) => void;
  isSelected: boolean;
  isDisabled: boolean;
  isSearchModified: boolean;
  children: React.ReactNode;
};

export const StrategyButton = ({
  strategyKey,
  handleStrategySearch,
  isSelected,
  isDisabled,
  isSearchModified,
  children,
}: StrategyButtonProps) => {
  const handleClick = () => {
    if (!isDisabled && isSelected && !isSearchModified) {
      return;
    }

    handleStrategySearch(strategyKey);
  };

  return (
    <button
      disabled={isDisabled}
      className={`${styles.button} ${isSelected ? styles.selected : ''}`.trim()}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
