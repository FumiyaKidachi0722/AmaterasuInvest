import React, { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ResultsTable } from '@/components/organisms/ResultsTable';
import { SearchMethod } from '@/utils/constants';

interface SearchParams {
  growthRate: string;
  profitMargin: string;
  yearsListed: string;
  ownerMajority: boolean;
  method: string;
}

interface SearchResult {
  name: string;
  ticker: string;
  growthRate: number;
  isGrowthOver20: boolean;
  profitMargin: number;
  isProfitOver10: boolean;
  listedDate: string;
  isWithinFiveYears: boolean;
}

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (searchParams: SearchParams) => {
    // クエリパラメータを作成する関数
    const createQueryParams = (params: any) => {
      return Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
        )
        .join('&');
    };
    const queryParams = createQueryParams(searchParams);
    let searchMethod = 'All';

    switch (searchParams.method) {
      case SearchMethod.All:
        searchMethod = 'All';
        break;
      case SearchMethod.One:
        searchMethod = 'One';
        break;
    }

    // APIからデータをフェッチするロジックをここに実装
    const response = await fetch(
      `http://localhost:4000/api/stocks/${searchMethod}?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (!response.ok) return;
    setSearchResults(
      data[0].map((item: any) => ({
        name: item[0],
        ticker: item[1],
        growthRate: item[2],
        isGrowthOver20: item[3],
        profitMargin: item[4],
        isProfitOver10: item[5],
        listedDate: item[6],
        isWithinFiveYears: item[7],
      })),
    );
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <ResultsTable results={searchResults} />
    </div>
  );
};

export default Home;
