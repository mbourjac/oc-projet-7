import styles from './Banner.module.scss';

type BannerProps = {
  image: string;
  children?: React.ReactNode;
};

export const Banner = ({ image, children }: BannerProps) => {
  return (
    <div className={styles.banner}>
      <img src={image} alt="" className={styles.image} />
      {children}
    </div>
  );
};
