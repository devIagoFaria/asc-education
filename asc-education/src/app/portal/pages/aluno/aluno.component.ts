import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private sql: SqlService
  ) { }

  //Variaveis Mutáveis
  public table: string = 'prova'
  public tableTitles: Array<any> = ['Turma' ]
  public otherTitles: Array<any> = ['Matriculado(a) em:' ]


  //Variaveis Não Mutáveis
  public focusedElement: any = {}
  public itens: Array<any> = [
    {
      materia: 'Não está matriculado em nenhuma turma no momento',
      provas: [
        {nota:'0.0'},
        {nota:'0.0'},
        {nota:'0.0'},
        {nota:'0.0'}
      
      ]}]
  public otherItens: Array<any>  = []
  public blocks: Array<any> = ['']
  public back: string = 'alunos'
  public media: string = '0.0';
  public status: string = '';

  //Boolean
  public showMedia: boolean = false
  public finalTest: boolean = false
  public addTest: boolean = true


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
      
        if(res.provas != '') this.mediaControl.defineItens(res)
        if(res.turmas.length == 0) this.noNewTeste();
        else this.otherItens = res.turmas
        


      }
    )

  }


  //-----------------CONTROLE------------------------//

  public mediaControl: any = {
     
    statusWithClass:(media: any, enrollment:any, testLength: any) => {
    
      let status; 

      if(testLength == 4){
        if(parseFloat(media) < 5){ status = 'Reprovado'}
        if(parseFloat(media) >= 5){ status = 'Aprovado'}
      }
      if(testLength == 3){
        if(parseFloat(media) < 4){ status = 'Reprovado'}
        if(parseFloat(media) >= 4 && parseFloat(media) < 6){ status = 'Recuperação'}
        if(parseFloat(media) >= 6){ status = 'Aprovado'}
      }


      let value = {
        id: enrollment,
        status: status
      }

      this.sql.statusWithClass(value, 'aluno').subscribe(
        res => res
      )

  
    },
    mediaIs:(params:any, enrollment:any) =>{

      let clear = params.filter((item:any) => { return item.nota != '0.0'})

      if(clear.length == 3 || 4){

        let multiplicandoPesosEsomandoTudo = clear.map((item:any) => {
          return item.nota*item.peso
        }).reduce((total:any, soma:any) => {
          
          total = parseFloat(total) + parseFloat(soma)
          return parseFloat(total).toFixed(2)
        })
  
        let somandoOsPesos = clear.map((item:any) => {
          return item.peso
        }).reduce((total:any, soma:any) => {
          
          total = parseFloat(total) + parseFloat(soma)
          return parseFloat(total).toFixed(2)
        })
  
        let media = (parseFloat(multiplicandoPesosEsomandoTudo)/ parseFloat(somandoOsPesos)).toFixed(2)
  
        this.mediaControl.statusWithClass(media, enrollment, clear.length)
        
        return media
  
  
  
      }
      else{
        return '0.0'
      }
  
    },
    defineItens:(res:any) => {
      this.itens = res.turmas.map((turma:any) => {

        let studentTests = turma.provas.filter((prova:any) => {
          return prova.idAluno == res.id
        })

      
        let matricula = turma.turmaAlunos.id
        let media;

        if(studentTests != ''){
          media = this.mediaControl.mediaIs(studentTests, matricula)
        }else{
          media = '0.0'
        }
        
        
        let status = turma.turmaAlunos.status
        if(status == null) status = 'Em andamento'

        this.mediaControl.fillEmpty(studentTests)

        return {
          turma: turma.materia,  
          provas: studentTests,
          media: media,
          status: status
        }
      })
    },
    fillEmpty:(params: any) => {

      if(params.length == 0){
  
        for (let i = 0; i < 3; i++) {
          params.push({nota: '0.0'})
        }
      }
  
      if(params.length == 1){
  
        for (let i = 0; i < 3; i++) {
          params.push({nota: '0.0'})
        }
      }
  
      if(params.length == 2){
        
        for (let i = 0; i < 2; i++) {
          params.push({nota: '0.0'})
        }
      }
  
      if(params.length == 3){
        
        for (let i = 0; i < 1; i++) {
          params.push({nota: '0.0'})
        }
      }
  
  
    }
  } 


  public noNewTeste(){
    this.addTest = false
  }

  //-----------------------Tirando a média--------------//




}
