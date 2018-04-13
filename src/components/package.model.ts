import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { PackageService } from "./package.service";

@Injectable()
export class PackageModel {
  public results$: Observable<any>;
  public headers$: Observable<any>;
  private showPages = 5;
  private middlePage = 3;
  private startPage = 1;
  private lastPages = 4;
  private count = 1;
  private sidePages = 2;
  private pageSize = 10;

  constructor(private serviceData: PackageService) { }

  public getHeaders() {
    return this.headers$ = this.serviceData.getHeaders();
  }

  public getResults() {
    return this.results$ = this.serviceData.getResults();
  }

  public getPager(
    totalItems: number,
    currentPage: number = this.startPage,
    pageSize: number = this.pageSize,
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage: number;
    if (totalPages <= this.showPages) {
      startPage = this.startPage;
      endPage = totalPages;
    } else if (currentPage <= this.middlePage) {
      startPage = this.startPage;
      endPage = this.showPages;
    } else if (currentPage + this.count >= totalPages) {
      startPage = totalPages - this.lastPages;
      endPage = totalPages;
    } else {
      startPage = currentPage - this.sidePages;
      endPage = currentPage + this.sidePages;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - this.count) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - this.count, totalItems - this.count);

    // create an array of pages
    const pages = _.range(startPage, endPage + this.count);

    return {
      currentPage,
      endIndex,
      endPage,
      pageSize,
      pages,
      startIndex,
      startPage,
      totalItems,
      totalPages,
    };
  }
}
