"use client";
import React from 'react';
import styles from './InventoryDashboardAddNewProducts.module.css';

const RadioGroup = ({ name, options, defaultValue }) => {
  return (
    <fieldset>
      <div className={styles.div33}>
        {options.map((option, index) => (
          <div key={option.value} className={index === 0 ? styles.div34 : styles.div35}>
            <img
              src={option.icon}
              alt=""
              className={styles.img21}
            />
            <label>
              <input
                type="radio"
                name={name}
                value={option.value}
                defaultChecked={option.value === defaultValue}
                className="sr-only"
              />
              <div className={styles.checkUncheckButton}>
                <div className={option.value === defaultValue ? styles.div36 : styles.div58}>
                  <div className={option.value === defaultValue ? styles.div37 : styles.div59} />
                </div>
              </div>
              <span className={option.value === defaultValue ? styles.goods : styles.services}>
                {option.label}
              </span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
