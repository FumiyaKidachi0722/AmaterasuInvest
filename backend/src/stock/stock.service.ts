// backend/src/stock/stock.service.ts

import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Injectable()
export class StockService {
  async filterStocks(query: any): Promise<any> {
    // Pythonスクリプトのパスを指定
    const pythonScriptPath =
      '/root/AmaterasuInvest/data-processing/scripts/one_analysis.py';

    // Pythonスクリプトへの引数を指定
    const options = {
      args: [JSON.stringify(query)], // クエリをJSON形式の文字列として渡す
    };

    try {
      // Pythonスクリプトを実行して結果を取得
      const results = await PythonShell.run(pythonScriptPath, options);

      console.log('Pythonスクリプトの実行結果:', results);

      return results;

      // ここではダミーデータを返す
      // return [
      //   {
      //     name: 'Sample Company',
      //     growthRate: '25%',
      //     profitMargin: '15%',
      //     yearsListed: '3',
      //     ownerMajority: true,
      //   },
      //   {
      //     name: 'Sample Company',
      //     growthRate: '25%',
      //     profitMargin: '15%',
      //     yearsListed: '3',
      //     ownerMajority: true,
      //   },
      // ];
    } catch (error) {
      console.error('Pythonスクリプトの実行中にエラーが発生しました:', error);

      // エラーが発生した場合は適切にハンドリングする
      throw error;
    }
  }

  async filterAllStocks(query: any): Promise<any> {
    // Pythonスクリプトのパスを指定
    const pythonScriptPath =
      '/root/AmaterasuInvest/data-processing/scripts/read_japan_stock_analysis.py';

    // Pythonスクリプトへの引数を指定
    const options = {
      args: [JSON.stringify(query)], // クエリをJSON形式の文字列として渡す
    };

    try {
      // Pythonスクリプトを実行して結果を取得
      const results = await PythonShell.run(pythonScriptPath, options);
      const parsedResults = results.map((result) => JSON.parse(result));

      return parsedResults;
    } catch (error) {
      console.error('Pythonスクリプトの実行中にエラーが発生しました:', error);

      // エラーが発生した場合は適切にハンドリングする
      throw error;
    }
  }
}
