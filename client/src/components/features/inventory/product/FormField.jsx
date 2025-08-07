"use client";
import React from 'react';
import styles from './InventoryDashboardAddNewProducts.module.css';

const FormField = ({
  label,
  placeholder,
  type = "text",
  required = false,
  hasDropdown = false,
  className = "",
  id,
  ...props
}) => {
  const fieldId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={styles.productName}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      <div className={styles.formFillingBox}>
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          aria-required={required}
          {...props}
        />
        {hasDropdown && (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdc223bf05372408259454e4538caee13a5ba889?placeholderIfAbsent=true&apiKey=82776467a8614b7f8e3fc60799d075b6"
            alt=""
            className={styles.img24}
          />
        )}
      </div>
    </div>
  );
};

export default FormField;
