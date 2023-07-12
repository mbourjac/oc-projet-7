import styles from './CarouselButton.module.scss';

type CarouselButtonProps = {
  src: string;
  alt: string;
  onClick: () => void;
};

export const CarouselButton = ({ src, alt, onClick }: CarouselButtonProps) => {
  return (
    <button className={`${styles.button}`} onClick={onClick}>
      <img src={src} alt={alt} className={styles.icon} />
    </button>
  );
};
