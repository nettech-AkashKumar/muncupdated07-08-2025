"use client";
import React from 'react';
import styles from './InventoryDashboardAddNewProducts.module.css';

const ProgressBar = () => {
  return (
    <section className={styles.progressbar} aria-label="Form progress">
      <div className={styles.div20}>
        <div className={styles.div21}>
          <div className={styles.div22}>
            <div className={styles.div23} role="img" aria-label="Current step">
              <div className={styles.div24} />
            </div>
            <div className={styles.div25} />
          </div>
          <div className={styles.titleandDescription}>
            <h2 className={styles.generalInformation}>
              General Information
            </h2>
            <p className={styles.basicInfoCategorySupplierInventoryProductType}>
              Basic Info + Category + Supplier + Inventory + Product Type
            </p>
          </div>
        </div>
        <div className={styles.progressButton}>
          <div className={styles.div26} role="img" aria-label="Step 2">
            <div className={styles.div27} />
          </div>
        </div>
      </div>
      <div className={styles.progressButton}>
        <div className={styles.div28} role="img" aria-label="Step 3">
          <div className={styles.div29} />
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;
