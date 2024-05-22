import React, { useState, useMemo } from 'react';
import { FilterForm } from '@/components/molecules/FilterForm';
import styles from './ResultsTable.module.css';

interface CompanyResult {
  name: string;
  ticker: string;
  listedDate: string; // このフィールドは日付形式の文字列
  isWithinFiveYears: boolean;
  growthRate5Years: number | null;
  growthRate4Years: number | null;
  growthRate3Years: number | null;
  growthRate2Years: number | null;
  growthRate1Year: number | null;
  profitMarginLatest: number | null;
  profitMargin5Years: number | null;
  profitMargin4Years: number | null;
  profitMargin3Years: number | null;
  profitMargin2Years: number | null;
  profitMargin1Year: number | null;
}

interface ResultsTableProps {
  results: CompanyResult[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CompanyResult;
    direction: 'ascending' | 'descending';
  } | null>(null);

  console.log('results: ', results);

  const [filters, setFilters] = useState<{
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
  }>({
    name: '',
    ticker: '',
    listedDate: '',
    isWithinFiveYears: null,
    growthRate5Years: '0',
    growthRate4Years: '0',
    growthRate3Years: '0',
    growthRate2Years: '0',
    growthRate1Year: '0',
    profitMarginLatest: '0',
    profitMargin5Years: '0',
    profitMargin4Years: '0',
    profitMargin3Years: '0',
    profitMargin2Years: '0',
    profitMargin1Year: '0',
  });

  const handleFilterChange = (key: string, value: string | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const nameString = result.name?.toString().toLowerCase() || '';
      const tickerString = result.ticker?.toString().toLowerCase() || '';
      const listedDateString = isValidDate(result.listedDate)
        ? new Date(result.listedDate).toISOString().split('T')[0]
        : ''; // 日付をYYYY-MM-DD形式に変換
      return (
        nameString.includes(filters.name.toLowerCase()) &&
        tickerString.includes(filters.ticker.toLowerCase()) &&
        listedDateString.includes(filters.listedDate) &&
        (filters.isWithinFiveYears === null ||
          result.isWithinFiveYears === filters.isWithinFiveYears) &&
        (result.growthRate5Years ?? 0) >=
          parseFloat(filters.growthRate5Years) / 100 &&
        (result.growthRate4Years ?? 0) >=
          parseFloat(filters.growthRate4Years) / 100 &&
        (result.growthRate3Years ?? 0) >=
          parseFloat(filters.growthRate3Years) / 100 &&
        (result.growthRate2Years ?? 0) >=
          parseFloat(filters.growthRate2Years) / 100 &&
        (result.growthRate1Year ?? 0) >=
          parseFloat(filters.growthRate1Year) / 100 &&
        (result.profitMarginLatest ?? 0) >=
          parseFloat(filters.profitMarginLatest) / 100 &&
        (result.profitMargin5Years ?? 0) >=
          parseFloat(filters.profitMargin5Years) / 100 &&
        (result.profitMargin4Years ?? 0) >=
          parseFloat(filters.profitMargin4Years) / 100 &&
        (result.profitMargin3Years ?? 0) >=
          parseFloat(filters.profitMargin3Years) / 100 &&
        (result.profitMargin2Years ?? 0) >=
          parseFloat(filters.profitMargin2Years) / 100 &&
        (result.profitMargin1Year ?? 0) >=
          parseFloat(filters.profitMargin1Year) / 100
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
    <div className={styles.resultsTableContainer}>
      <div className={styles.filterFormContainer}>
        <div className={styles.filterItem}>
          <label htmlFor="name">企業名:</label>
          <input
            id="name"
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="ticker">ティッカーシンボル:</label>
          <input
            id="ticker"
            type="text"
            value={filters.ticker}
            onChange={(e) => handleFilterChange('ticker', e.target.value)}
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="listedDate">上場日:</label>
          <input
            id="listedDate"
            type="text"
            value={filters.listedDate}
            onChange={(e) => handleFilterChange('listedDate', e.target.value)}
          />
        </div>
        <div className={styles.filterItem}>
          <label>上場5年以内:</label>
          <div>
            <label>
              <input
                type="radio"
                value="はい"
                checked={filters.isWithinFiveYears === true}
                onChange={() => handleFilterChange('isWithinFiveYears', true)}
              />
              はい
            </label>
            <label>
              <input
                type="radio"
                value="いいえ"
                checked={filters.isWithinFiveYears === false}
                onChange={() => handleFilterChange('isWithinFiveYears', false)}
              />
              いいえ
            </label>
            <button
              onClick={() => handleFilterChange('isWithinFiveYears', null)}
            >
              クリア
            </button>
          </div>
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="growthRate5Years">5年平均成長率:</label>
          <input
            id="growthRate5Years"
            type="text"
            value={filters.growthRate5Years}
            onChange={(e) =>
              handleFilterChange('growthRate5Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="growthRate4Years">4年平均成長率:</label>
          <input
            id="growthRate4Years"
            type="text"
            value={filters.growthRate4Years}
            onChange={(e) =>
              handleFilterChange('growthRate4Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="growthRate3Years">3年平均成長率:</label>
          <input
            id="growthRate3Years"
            type="text"
            value={filters.growthRate3Years}
            onChange={(e) =>
              handleFilterChange('growthRate3Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="growthRate2Years">2年平均成長率:</label>
          <input
            id="growthRate2Years"
            type="text"
            value={filters.growthRate2Years}
            onChange={(e) =>
              handleFilterChange('growthRate2Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="growthRate1Year">1年平均成長率:</label>
          <input
            id="growthRate1Year"
            type="text"
            value={filters.growthRate1Year}
            onChange={(e) =>
              handleFilterChange('growthRate1Year', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMarginLatest">最新営業利益率:</label>
          <input
            id="profitMarginLatest"
            type="text"
            value={filters.profitMarginLatest}
            onChange={(e) =>
              handleFilterChange('profitMarginLatest', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMargin5Years">5年平均営業利益率:</label>
          <input
            id="profitMargin5Years"
            type="text"
            value={filters.profitMargin5Years}
            onChange={(e) =>
              handleFilterChange('profitMargin5Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMargin4Years">4年平均営業利益率:</label>
          <input
            id="profitMargin4Years"
            type="text"
            value={filters.profitMargin4Years}
            onChange={(e) =>
              handleFilterChange('profitMargin4Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMargin3Years">3年平均営業利益率:</label>
          <input
            id="profitMargin3Years"
            type="text"
            value={filters.profitMargin3Years}
            onChange={(e) =>
              handleFilterChange('profitMargin3Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMargin2Years">2年平均営業利益率:</label>
          <input
            id="profitMargin2Years"
            type="text"
            value={filters.profitMargin2Years}
            onChange={(e) =>
              handleFilterChange('profitMargin2Years', e.target.value)
            }
          />
        </div>
        <div className={styles.filterItem}>
          <label htmlFor="profitMargin1Year">1年平均営業利益率:</label>
          <input
            id="profitMargin1Year"
            type="text"
            value={filters.profitMargin1Year}
            onChange={(e) =>
              handleFilterChange('profitMargin1Year', e.target.value)
            }
          />
        </div>
      </div>
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
            <th
              onClick={() => requestSort('growthRate5Years')}
              className={styles.header}
            >
              5年平均成長率
            </th>
            <th
              onClick={() => requestSort('growthRate4Years')}
              className={styles.header}
            >
              4年平均成長率
            </th>
            <th
              onClick={() => requestSort('growthRate3Years')}
              className={styles.header}
            >
              3年平均成長率
            </th>
            <th
              onClick={() => requestSort('growthRate2Years')}
              className={styles.header}
            >
              2年平均成長率
            </th>
            <th
              onClick={() => requestSort('growthRate1Year')}
              className={styles.header}
            >
              1年平均成長率
            </th>
            <th
              onClick={() => requestSort('profitMarginLatest')}
              className={styles.header}
            >
              最新営業利益率
            </th>
            <th
              onClick={() => requestSort('profitMargin5Years')}
              className={styles.header}
            >
              5年平均営業利益率
            </th>
            <th
              onClick={() => requestSort('profitMargin4Years')}
              className={styles.header}
            >
              4年平均営業利益率
            </th>
            <th
              onClick={() => requestSort('profitMargin3Years')}
              className={styles.header}
            >
              3年平均営業利益率
            </th>
            <th
              onClick={() => requestSort('profitMargin2Years')}
              className={styles.header}
            >
              2年平均営業利益率
            </th>
            <th
              onClick={() => requestSort('profitMargin1Year')}
              className={styles.header}
            >
              1年平均営業利益率
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredResults.map((result, index) => (
            <tr key={index}>
              <td className={styles.cell}>{result.name ?? ''}</td>
              <td className={styles.cell}>{result.ticker ?? ''}</td>
              <td className={styles.cell}>
                {isValidDate(result.listedDate)
                  ? new Date(result.listedDate).toISOString().split('T')[0]
                  : 'Invalid Date'}
              </td>
              <td className={styles.cell}>
                {result.isWithinFiveYears ? 'はい' : 'いいえ'}
              </td>
              <td className={styles.cell}>
                {((result.growthRate5Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.growthRate4Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.growthRate3Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.growthRate2Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.growthRate1Year ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMarginLatest ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMargin5Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMargin4Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMargin3Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMargin2Years ?? 0) * 100).toFixed(2)}%
              </td>
              <td className={styles.cell}>
                {((result.profitMargin1Year ?? 0) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
