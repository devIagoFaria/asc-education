import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private sql: SqlService
  ) { }

  //Variaveis Mutáveis
  public table: string = 'professor'
  public tableTitles: Array<any> = ['Turmas']


  //Variaveis Não Mutáveis
  public focusedElement: any = {}
  public itens: any = [{turmas: { materia: 'Não possui nenhuma turma no momento' } }]
  public back: string = 'professores'

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

        if(res.turmas != '') this.itens = res.turmas
      }
    )

  }
  
}
