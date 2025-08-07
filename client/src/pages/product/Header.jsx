"use client";
import React from 'react';
import styles from './InventoryDashboardAddNewProducts.module.css';

const Header = () => {
  return (
    <header className={styles.div} role="banner">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/94fefbe10595ac9a5b3a31e5aa5dc281467a7648?placeholderIfAbsent=true&apiKey=82776467a8614b7f8e3fc60799d075b6"
        alt="Company Logo"
        className={styles.img}
      />
      <nav className={styles.div2} role="navigation" aria-label="User actions">
        <div className={styles.div3}>
          <button className={styles.div4} aria-label="Notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fccfb428807943a5ba7c22b48ee70a3455f95a4b?placeholderIfAbsent=true&apiKey=82776467a8614b7f8e3fc60799d075b6"
              alt=""
              className={styles.img2}
            />
          </button>
          <button className={styles.div5} aria-label="Messages">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/271d14779171a658623e7bd49e7aa0a61c40b240?placeholderIfAbsent=true&apiKey=82776467a8614b7f8e3fc60799d075b6"
              alt=""
              className={styles.img3}
            />
          </button>
        </div>
        <button aria-label="User profile">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cece74287b69a06d1361c1fcdfcb557763845dee?placeholderIfAbsent=true&apiKey=82776467a8614b7f8e3fc60799d075b6"
            alt="User avatar"
            className={styles.img4}
          />
        </button>
      </nav>
    </header>
  );
};

export default Header;
