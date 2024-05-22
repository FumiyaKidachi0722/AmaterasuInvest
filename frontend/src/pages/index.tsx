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
  listedDate: string;
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
    console.log('data: ', data);
    setSearchResults(
      data[0].map((item: any) => ({
        name: item[0],
        ticker: item[1],
        listedDate: item[2],
        isWithinFiveYears: item[3],
        growthRate5Years: item[4],
        growthRate4Years: item[5],
        growthRate3Years: item[6],
        growthRate2Years: item[7],
        growthRate1Year: item[8],
        profitMarginLatest: item[9],
        profitMargin5Years: item[10],
        profitMargin4Years: item[11],
        profitMargin3Years: item[12],
        profitMargin2Years: item[13],
        profitMargin1Year: item[14],
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
