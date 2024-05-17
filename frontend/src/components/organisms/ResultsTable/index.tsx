// src/components/organisms/ResultsTable/ResultsTable.tsx
import React, { useState, useMemo } from 'react';
import { FilterForm } from '@/components/molecules/FilterForm';
import styles from './ResultsTable.module.css';

interface CompanyResult {
  name: string;
  ticker: string;
  growthRate: number;
  isGrowthOver20: boolean;
  profitMargin: number;
  isProfitOver10: boolean;
  listedDate: string;
  isWithinFiveYears: boolean;
}

interface ResultsTableProps {
  results: CompanyResult[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CompanyResult;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const [filters, setFilters] = useState<{
    name: string;
    ticker: string;
    growthRate: string;
    isGrowthOver20: boolean | null;
    profitMargin: string;
    isProfitOver10: boolean | null;
    listedDate: string;
    isWithinFiveYears: boolean | null;
  }>({
    name: '',
    ticker: '',
    growthRate: '0',
    isGrowthOver20: null,
    profitMargin: '0',
    isProfitOver10: null,
    listedDate: '',
    isWithinFiveYears: null,
  });

  const handleFilterChange = (key: string, value: string | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const tickerString = result.ticker?.toString().toLowerCase() || '';
      return (
        result.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        tickerString.includes(filters.ticker.toLowerCase()) &&
        result.listedDate.includes(filters.listedDate) &&
        result.growthRate >= parseFloat(filters.growthRate) / 100 &&
        (filters.isGrowthOver20 === null ||
          result.isGrowthOver20 === filters.isGrowthOver20) &&
        (parseFloat(filters.profitMargin) === 0 ||
          result.profitMargin >= parseFloat(filters.profitMargin) / 100) &&
        (filters.isProfitOver10 === null ||
          result.isProfitOver10 === filters.isProfitOver10) &&
        (filters.isWithinFiveYears === null ||
          result.isWithinFiveYears === filters.isWithinFiveYears)
      );
    });
  }, [results, filters]);

  const sortedAndFilteredResults = useMemo(() => {
    let sortableItems = [...filteredResults];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? 0;
        const bValue = b[sortConfig.key] ?? 0;
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredResults, sortConfig]);

  const requestSort = (key: keyof CompanyResult) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <FilterForm filters={filters} onFilterChange={handleFilterChange} />
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')} className={styles.header}>
              企業名
            </th>
            <th onClick={() => requestSort('ticker')} className={styles.header}>
              ティッカーシンボル
            </th>
            <th
              onClick={() => requestSort('growthRate')}
              className={styles.header}
            >
              成長率
            </th>
            <th
              onClick={() => requestSort('isGrowthOver20')}
              className={styles.header}
            >
              成長率20%以上
            </th>
            <th
              onClick={() => requestSort('profitMargin')}
              className={styles.header}
            >
              利益率
            </th>
            <th
              onClick={() => requestSort('isProfitOver10')}
              className={styles.header}
            >
              利益率10%以上
            </th>
            <th
              onClick={() => requestSort('listedDate')}
              className={styles.header}
            >
              上場日
            </th>
            <th
              onClick={() => requestSort('isWithinFiveYears')}
              className={styles.header}
            >
              上場5年以内
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredResults.map((result, index) => (
            <tr key={index}>
              <td className={styles.cell}>{result.name}</td>
              <td className={styles.cell}>{result.ticker}</td>
              <td className={styles.cell}>
                {(result.growthRate * 100)?.toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {result.isGrowthOver20 ? 'はい' : 'いいえ'}
              </td>
              <td className={styles.cell}>
                {(result.profitMargin * 100)?.toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {result.isProfitOver10 ? 'はい' : 'いいえ'}
              </td>
              <td className={styles.cell}>{result.listedDate}</td>
              <td className={styles.cell}>
                {result.isWithinFiveYears ? 'はい' : 'いいえ'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
