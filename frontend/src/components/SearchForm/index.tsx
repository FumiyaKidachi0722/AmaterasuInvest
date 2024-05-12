import React, { useState } from 'react';
import { SearchMethod } from '@/utils/constants';

interface Props {
  onSearch: (searchParams: any) => void;
}

interface SearchParams {
  growthRate: string;
  profitMargin: string;
  yearsListed: string;
  ownerMajority: boolean;
  method: string;
}

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [searchMethod, setSearchMethod] = useState(SearchMethod.All);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchParams: SearchParams = {
      growthRate: formData.get('growthRate') as string,
      profitMargin: formData.get('profitMargin') as string,
      yearsListed: formData.get('yearsListed') as string,
      ownerMajority: formData.get('ownerMajority') === 'on',
      method: searchMethod,
    };
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="growthRate" type="text" placeholder="売上成長率" />
      <input name="profitMargin" type="text" placeholder="営業利益率" />
      <input name="yearsListed" type="text" placeholder="上場年数" />
      <label>
        <input name="ownerMajority" type="checkbox" /> 筆頭株主は社長
      </label>
      <select
        value={searchMethod}
        onChange={(e) => setSearchMethod(e.target.value as SearchMethod)}
      >
        <option value={SearchMethod.All}>すべての株価情報を取得</option>
        <option value={SearchMethod.One}>1つの株価情報を取得</option>
      </select>
      <button type="submit">検索</button>
    </form>
  );
};
