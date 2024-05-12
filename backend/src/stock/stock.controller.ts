import { Controller, Get, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('api/stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('one')
  async getStocks(@Query() query: any) {
    return this.stockService.filterStocks(query);
  }

  @Get('all')
  async getAllStocks(@Query() query: any) {
    return this.stockService.filterAllStocks(query);
  }
}
