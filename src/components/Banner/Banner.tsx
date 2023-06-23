import styles from './Banner.module.scss';

type BannerProps = {
  image: {
    small: string;
    medium: string;
    large: string;
  };
  children?: React.ReactNode;
};

export const Banner = ({ image, children }: BannerProps) => {
  return (
    <div className={styles.banner}>
      <img
        srcSet={`
          ${image.small} 870w,
          ${image.medium} 1648w,
          ${image.large} 2400w
          `}
        sizes="
          (max-width: 768px) calc(100vw - 40px),
          (max-width: 1400px) calc(100vw - 200px),
          1200px
        "
        src={image.small}
        alt=""
        className={styles.image}
      ></img>
      {children}
    </div>
  );
};
