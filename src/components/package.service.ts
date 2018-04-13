import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PackageService {
    constructor(public http: Http) { }

    public getResults(): Observable<any> {
        return this.http.get("assets/result.json")
            .map((res: Response) => res.json().results);
    }

    public getHeaders(): Observable<any> {
        return this.http.get("assets/result.json")
          .map((res: Response) => res.json().headers);
      }

}
