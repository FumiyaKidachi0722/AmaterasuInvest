// frontend/src/components/molecules/FilterForm/index.tsx

import React from 'react';
import { FilterInput } from '@/components/atoms/FilterInput';
import { FilterRadio } from '@/components/atoms/FilterRadio';
import styles from './FilterForm.module.css';

interface FilterFormProps {
  filters: {
    name: string;
    ticker: string;
    growthRate: string;
    isGrowthOver20: boolean | null;
    profitMargin: string;
    isProfitOver10: boolean | null;
    listedDate: string;
    isWithinFiveYears: boolean | null;
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
        itemName="成長率"
        value={filters.growthRate}
        onChange={handleInputChange('growthRate')}
        placeholder="成長率で検索 (%以上)"
      />
      <FilterRadio
        itemName="成長率20%以上"
        name="isGrowthOver20"
        value={filters.isGrowthOver20}
        onChange={handleRadioChange('isGrowthOver20')}
        onClear={() => handleRadioChange('isGrowthOver20')(null)}
      />
      <FilterInput
        itemName="利益率"
        value={filters.profitMargin}
        onChange={handleInputChange('profitMargin')}
        placeholder="利益率で検索 (%以上)"
      />
      <FilterRadio
        itemName="利益率10%以上"
        name="isProfitOver10"
        value={filters.isProfitOver10}
        onChange={handleRadioChange('isProfitOver10')}
        onClear={() => handleRadioChange('isProfitOver10')(null)}
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
    </div>
  );
};
