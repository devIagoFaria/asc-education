import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor(private http: HttpClient) { }

  public url: string = 'http://localhost:3000'

  public getList(table: string): Observable<any>{
    return this.http.get(`${this.url}/${table}`)
    .pipe(res => res)
  }

  public getOne(id:number, table:string): Observable<any>{
    return this.http.get(`${this.url}/${table}/${id}`)
    .pipe(res => res)
  }

  public addOne(value:any, table:string): Observable<any>{
    return this.http.post(`${this.url}/${table}/add`, value)
    .pipe(res => res)
  }

  public status(value:any, table:string): Observable<any>{
    return this.http.put(`${this.url}/${table}/edit/status`, value)
    .pipe(res => res)
  }

  public newTest(value:any): Observable<any>{
    return this.http.post(`${this.url}/aluno/test`, value)
    .pipe(res => res)
  }

  public deleteOne(id:number, table:string): Observable<any>{
    return this.http.delete(`${this.url}/${table}/delete=${id}`)
    .pipe(res => res)
  }
  
  public editOne(value:any, table:string): Observable<any>{
    return this.http.put(`${this.url}/${table}/edit`, value)
    .pipe(res => res)
  }

  public newEnrollment(value:any, table:string): Observable<any>{
    return this.http.post(`${this.url}/${table}/aluno_turma`, value)
    .pipe(res => res)
  }

  public statusWithClass(value:any, table:string): Observable<any>{
    return this.http.put(`${this.url}/${table}/aluno_turma`, value)
    .pipe(res => res)
  }

}
