// src/components/molecules/FilterForm/index.tsx

import React from 'react';
import { FilterInput } from '@/components/atoms/FilterInput';
import { FilterRadio } from '@/components/atoms/FilterRadio';
import styles from './FilterForm.module.css';

interface FilterFormProps {
  filters: {
    name: string;
    ticker: string;
    listedDate: string;
    isWithinFiveYears: boolean | null;
    growthRate5Years: string;
    growthRate4Years: string;
    growthRate3Years: string;
    growthRate2Years: string;
    growthRate1Year: string;
    profitMarginLatest: string;
    profitMargin5Years: string;
    profitMargin4Years: string;
    profitMargin3Years: string;
    profitMargin2Years: string;
    profitMargin1Year: string;
  };
  onFilterChange: (key: string, value: string | boolean | null) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleInputChange = (key: string) => (value: string | null) => {
    onFilterChange(key, value);
  };

  const handleRadioChange = (key: string) => (value: boolean | null) => {
    onFilterChange(key, value);
  };

  return (
    <div className={styles.filterForm}>
      <FilterInput
        itemName="企業名"
        value={filters.name}
        onChange={handleInputChange('name')}
        placeholder="企業名で検索"
      />
      <FilterInput
        itemName="ティッカーシンボル"
        value={filters.ticker}
        onChange={handleInputChange('ticker')}
        placeholder="ティッカーシンボルで検索"
      />
      <FilterInput
        itemName="上場日"
        value={filters.listedDate}
        onChange={handleInputChange('listedDate')}
        placeholder="上場日で検索 (YYYY-MM-DD)"
      />
      <FilterRadio
        itemName="上場5年以内"
        name="isWithinFiveYears"
        value={filters.isWithinFiveYears}
        onChange={handleRadioChange('isWithinFiveYears')}
        onClear={() => handleRadioChange('isWithinFiveYears')(null)}
      />
      <FilterInput
        itemName="5年平均成長率"
        value={filters.growthRate5Years}
        onChange={handleInputChange('growthRate5Years')}
        placeholder="5年平均成長率 (%以上)"
      />
      <FilterInput
        itemName="4年平均成長率"
        value={filters.growthRate4Years}
        onChange={handleInputChange('growthRate4Years')}
        placeholder="4年平均成長率 (%以上)"
      />
      <FilterInput
        itemName="3年平均成長率"
        value={filters.growthRate3Years}
        onChange={handleInputChange('growthRate3Years')}
        placeholder="3年平均成長率 (%以上)"
      />
      <FilterInput
        itemName="2年平均成長率"
        value={filters.growthRate2Years}
        onChange={handleInputChange('growthRate2Years')}
        placeholder="2年平均成長率 (%以上)"
      />
      <FilterInput
        itemName="1年平均成長率"
        value={filters.growthRate1Year}
        onChange={handleInputChange('growthRate1Year')}
        placeholder="1年平均成長率 (%以上)"
      />
      <FilterInput
        itemName="最新営業利益率"
        value={filters.profitMarginLatest}
        onChange={handleInputChange('profitMarginLatest')}
        placeholder="最新営業利益率 (%以上)"
      />
      <FilterInput
        itemName="5年平均営業利益率"
        value={filters.profitMargin5Years}
        onChange={handleInputChange('profitMargin5Years')}
        placeholder="5年平均営業利益率 (%以上)"
      />
      <FilterInput
        itemName="4年平均営業利益率"
        value={filters.profitMargin4Years}
        onChange={handleInputChange('profitMargin4Years')}
        placeholder="4年平均営業利益率 (%以上)"
      />
      <FilterInput
        itemName="3年平均営業利益率"
        value={filters.profitMargin3Years}
        onChange={handleInputChange('profitMargin3Years')}
        placeholder="3年平均営業利益率 (%以上)"
      />
      <FilterInput
        itemName="2年平均営業利益率"
        value={filters.profitMargin2Years}
        onChange={handleInputChange('profitMargin2Years')}
        placeholder="2年平均営業利益率 (%以上)"
      />
      <FilterInput
        itemName="1年平均営業利益率"
        value={filters.profitMargin1Year}
        onChange={handleInputChange('profitMargin1Year')}
        placeholder="1年平均営業利益率 (%以上)"
      />
    </div>
  );
};
