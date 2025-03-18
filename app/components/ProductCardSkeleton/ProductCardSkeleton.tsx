import styles from "./ProductCardSkeleton.module.css";

export default function ProductCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageContainer}>
        <div className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.category} />
        <div className={styles.title} />
        <div className={styles.description} />
        <div className={styles.rating} />
        <div className={styles.price} />
        <div className={styles.installments} />
        <div className={styles.shipping} />
        <div className={styles.button} />
      </div>
    </div>
  );
}