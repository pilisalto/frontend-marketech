import Header from "../Header/Header";
import styles from "./ProductDetailSkeleton.module.css";

export default function ProductDetailSkeleton() {
  return (
    <main>
      <Header onSearch={() => {}} />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.gallery}>
            <div className={styles.imageContainer}>
              <div className={styles.image} />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.breadcrumb} />
            <div className={styles.title} />
            <div className={styles.price} />
            <div className={styles.paymentOptions}>
              <div className={styles.option} />
              <div className={styles.option} />
            </div>
            <div className={styles.actions}>
              <div className={styles.quantity} />
              <div className={styles.button} />
            </div>
            <div className={styles.wishlist} />
            <div className={styles.details}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.detailSection} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}