// src/components/atoms/FilterInput/index.tsx

import React from 'react';
import styles from './FilterInput.module.css';

interface FilterInputProps {
  itemName: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
export const FilterInput: React.FC<FilterInputProps> = ({
  itemName,
  value,
  onChange,
  placeholder,
}) => (
  <div className={styles.filterInputContainer}>
    <label className={styles.label}>{itemName}:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);
