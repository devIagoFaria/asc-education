import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  constructor(
    private sql: SqlService,
    private router: Router
  ) { }


  //Variaveis Mutáveis
  public table: string = 'turma'



  //Variaveis Não-Mutaveis
  public itens: Array<any> = []
  public tableTitles: Array<string> = []


  ngOnInit(): void {
    this.reloadList(this.table)
  }




  public reloadList(table: string) {

    this.tableTitles = ['Turmas', ' ']

    this.sql.getList(table).subscribe(res => {
      this.itens = res
    })
  }

  public deleteElement(id: any) {
    return this.sql.deleteOne(id, this.table).subscribe(res => {
      this.reloadList(this.table)
    })
  }

  public editElement(id: any) {

    return this.sql.getOne(id, this.table).subscribe(res => {
      this.router.navigate([`/portal/formulario/${id}/${this.table}`])
    })
  }
}
