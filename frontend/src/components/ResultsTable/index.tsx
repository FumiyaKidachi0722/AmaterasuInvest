import React, { useState, useMemo } from 'react';
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
    growthRate: '',
    isGrowthOver20: null,
    profitMargin: '',
    isProfitOver10: null,
    listedDate: '',
    isWithinFiveYears: null,
  });

  const handleFilterChange = (key: keyof CompanyResult, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        key === 'isGrowthOver20' ||
        key === 'isProfitOver10' ||
        key === 'isWithinFiveYears'
          ? value === 'true'
          : value,
    }));
  };

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      return (
        result.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        result.ticker.toLowerCase().includes(filters.ticker.toLowerCase()) &&
        result.listedDate.includes(filters.listedDate) &&
        (!filters.growthRate ||
          result.growthRate >= parseFloat(filters.growthRate)) &&
        (filters.isGrowthOver20 === null ||
          result.isGrowthOver20 === filters.isGrowthOver20) &&
        (!filters.profitMargin ||
          result.profitMargin >= parseFloat(filters.profitMargin)) &&
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
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          placeholder="企業名で検索"
        />
        <input
          type="text"
          value={filters.ticker}
          onChange={(e) => handleFilterChange('ticker', e.target.value)}
          placeholder="ティッカーシンボルで検索"
        />
        <input
          type="text"
          value={filters.growthRate}
          onChange={(e) => handleFilterChange('growthRate', e.target.value)}
          placeholder="成長率で検索 (%以上)"
        />
        <label>
          <input
            type="radio"
            name="isGrowthOver20"
            value="true"
            checked={filters.isGrowthOver20 === true}
            onChange={(e) =>
              handleFilterChange('isGrowthOver20', e.target.value)
            }
          />
          はい
          <input
            type="radio"
            name="isGrowthOver20"
            value="false"
            checked={filters.isGrowthOver20 === false}
            onChange={(e) =>
              handleFilterChange('isGrowthOver20', e.target.value)
            }
          />
          いいえ
        </label>
        <input
          type="text"
          value={filters.profitMargin}
          onChange={(e) => handleFilterChange('profitMargin', e.target.value)}
          placeholder="利益率で検索 (%以上)"
        />
        <label>
          <input
            type="radio"
            name="isProfitOver10"
            value="true"
            checked={filters.isProfitOver10 === true}
            onChange={(e) =>
              handleFilterChange('isProfitOver10', e.target.value)
            }
          />
          はい
          <input
            type="radio"
            name="isProfitOver10"
            value="false"
            checked={filters.isProfitOver10 === false}
            onChange={(e) =>
              handleFilterChange('isProfitOver10', e.target.value)
            }
          />{' '}
          いいえ
        </label>
        <input
          type="text"
          value={filters.listedDate}
          onChange={(e) => handleFilterChange('listedDate', e.target.value)}
          placeholder="上場日で検索 (YYYY-MM-DD)"
        />
        <label>
          <input
            type="radio"
            name="isWithinFiveYears"
            value="true"
            checked={filters.isWithinFiveYears === true}
            onChange={(e) =>
              handleFilterChange('isWithinFiveYears', e.target.value)
            }
          />{' '}
          はい
          <input
            type="radio"
            name="isWithinFiveYears"
            value="false"
            checked={filters.isWithinFiveYears === false}
            onChange={(e) =>
              handleFilterChange('isWithinFiveYears', e.target.value)
            }
          />{' '}
          いいえ
        </label>
      </div>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            {results.length > 0 ? (
              Object.keys(results[0]).map((key) => (
                <th
                  key={key}
                  className={`${styles.header} ${sortConfig?.key === key ? styles.activeSort : ''}`}
                  onClick={() => requestSort(key as keyof CompanyResult)}
                >
                  {key}
                </th>
              ))
            ) : (
              <th>データがありません</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredResults.map((result, index) => (
            <tr key={index}>
              <td className={styles.cell}>{result.name}</td>
              <td className={styles.cell}>{result.ticker}</td>
              <td className={styles.cell}>{result.growthRate?.toFixed(2)}%</td>
              <td className={styles.cell}>
                {result.isGrowthOver20 ? 'はい' : 'いいえ'}
              </td>
              <td className={styles.cell}>
                {result.profitMargin?.toFixed(2)}%
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
