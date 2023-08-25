import styles from './CarouselButton.module.scss';

type CarouselButtonProps = {
  src: string;
  alt: string;
  handleNavigation: () => void;
};

export const CarouselButton = ({
  src,
  alt,
  handleNavigation,
}: CarouselButtonProps) => {
  return (
    <button className={`${styles.button}`} onClick={handleNavigation}>
      <img src={src} alt={alt} className={styles.icon} />
    </button>
  );
};
