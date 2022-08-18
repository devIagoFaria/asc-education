import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../interfaces/student';

//interface
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  constructor(
    private sql: SqlService,
    private router: Router
  ) { }


  //Variaveis Mutáveis
  public table: string = 'aluno'



  //Variaveis Não-Mutaveis
  public itens: Array<Student> = []
  public tableTitles: Array<string> = []
 


  ngOnInit(): void {
    this.reloadList(this.table)
  }



  
  public reloadList(table: string){
    
     this.tableTitles = ['Alunos', 'Status', ' ']

    this.sql.getList(table).subscribe(res => { 
      this.itens = res

      this.itens.sort((a:any,b:any ) => {
        if(a.nome > b.nome){
          return 1
        }

        if(a.nome < b.nome){
          return -1
        }
        return 0
      })
    })
  }

  public deleteElement(id: any){
   return  this.sql.deleteOne(id, this.table).subscribe(res=>{
      this.reloadList(this.table)
    })
  }

  public editElement(id: any){

    return  this.sql.getOne(id, this.table).subscribe(res=>{
      this.router.navigate([`/portal/formulario/${id}/${this.table}`])
     })
  }



  

}
