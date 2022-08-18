import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.scss']
})
export class TurmaComponent implements OnInit {


  constructor(
    private activeRouter: ActivatedRoute,
    private sql: SqlService
  ) { }

  //Variaveis Mutáveis
  public table: string = 'turma'
  public tableTitles: Array<any> = ['Professor']
  public otherTableTitles: Array<any> = ['Alunos', 'Status']


  //Variaveis Não Mutáveis
  public focusedElement: any = {}
  public item: any = {materia: 'Não possui nenhum professor no momento'}
  public otherItens: any = [{materia: 'Não possui nenhum aluno no momento'}]
  public back: string = 'turmas'

  ngOnInit(): void {

    this.activeRouter.params.subscribe(
      res => {
        this.pageFocus(res)
      }
    )
  }

  public pageFocus(event: any) {

    this.sql.getOne(event.id, event.table).subscribe(
      res => {

        this.focusedElement = res
        this.item = res.professor

        
        this.otherItens = res.alunos
        this.otherItens.sort((a:any,b:any ) => {
          if(a.nome > b.nome){
            return 1
          }
  
          if(a.nome < b.nome){
            return -1
          }
          return 0
        })
 
      }
    )

  }

}
