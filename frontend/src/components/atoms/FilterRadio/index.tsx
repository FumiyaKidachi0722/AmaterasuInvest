// src/components/atoms/FilterRadio/index.tsx

import React, { useState, useEffect } from 'react';
import styles from './FilterRadio.module.css';

interface FilterRadioProps {
  itemName: string;
  name: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  onClear: () => void; // クリアボタン用のハンドラ
}

export const FilterRadio: React.FC<FilterRadioProps> = ({
  itemName,
  name,
  value,
  onChange,
  onClear,
}) => {
  const [selected, setSelected] = useState<boolean | null>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = (newValue: boolean) => {
    setSelected(newValue);
    onChange(newValue);
  };

  const handleOnClear = () => {
    setSelected(null);
  };

  return (
    <div className={styles.filterRadioContainer}>
      <div className={styles.itemName}>{itemName}:</div>
      <label className={styles.label}>
        <input
          type="radio"
          name={name}
          value="true"
          checked={selected === true}
          onChange={() => handleChange(true)} // onChangeハンドラを使用
          className={styles.radio}
        />
        はい
      </label>
      <label className={styles.label}>
        <input
          type="radio"
          name={name}
          value="false"
          checked={selected === false}
          onChange={() => handleChange(false)} // onChangeハンドラを使用
          className={styles.radio}
        />
        いいえ
      </label>
      <button
        type="button"
        onClick={handleOnClear}
        className={styles.clearButton}
      >
        クリア
      </button>
    </div>
  );
};
