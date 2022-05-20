import { Injectable } from '@nestjs/common';
import { Paginator } from 'nestjs-keyset-paginator';

@Injectable()
export class DataPaginatorService {
  public paginator: Paginator;

  constructor() {
    this.paginator = new Paginator();
  }
}
