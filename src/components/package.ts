import { Component } from "@angular/core";
import { PackageModel } from "./package.model";

const HTML_TEMPLATE = `
<table>
    <tr>
        <th class="titles" *ngFor="let header of headers" text-center>{{header}}</th>
    </tr>
    <tr *ngFor="let item of pagedItems">
        <td class="content" *ngFor="let element of elements" text-center>{{item[element]}}</td>
    </tr>
</table>
<br>

<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li>
        <a (click)="setPage(1)">First</a>
    </li>
    <li>
        <a (click)="setPage(pager.currentPage - 1)">Previous</a>
    </li>
    <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
        <a (click)="setPage(page)">{{page}}</a>
    </li>
    <li>
        <a (click)="setPage(pager.currentPage + 1)">Next</a>
    </li>
    <li>
        <a (click)="setPage(pager.totalPages)">Last</a>
    </li>
</ul>
`;

const CSS_STYLE = `
table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
}

.titles {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;  
    padding: 16px;
    text-align: left;
    background-color: rgb(20, 140, 187);
    color: white;
}
.content {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border: 1px solid #ddd;
    padding: 8px;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.active>a {
  z-index: 3;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

li {
  display: inline;
}

a {
  position: relative;
  float: left;
  padding: 6px 12px;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

li:first-child>a {
  margin-left: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

li:last-child>a {
  margin-left: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
`;

@Component({
  selector: "package",
  template: HTML_TEMPLATE,
  styles: [CSS_STYLE]
})
export class PackageComponent {
  public pager: any = {};
  public pagedItems: any[];
  public uid: any = 0;
  public elements: any;
  public headers: any;
  public results: any;

  constructor(public packageModel: PackageModel) {
    this.getData();
  }

  public getData() {
    this.packageModel.getHeaders().subscribe((data) => {
      this.headers = data;
    });
    this.packageModel.getResults().subscribe((data) => {
      this.results = data;
      this.elements = Object.keys(this.results[this.uid]);
      this.setPage(1);
    });
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.packageModel.getPager(this.results.length, page);
    // get current page of items
    this.pagedItems = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}

