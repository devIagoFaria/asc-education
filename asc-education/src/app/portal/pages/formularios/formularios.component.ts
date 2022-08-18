import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent implements OnInit {

  constructor(
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activedRouter.params.subscribe(res => {
      this.theFormIs(res)
    })
  }


  //Variaveis Automaticas
  public studentForm: boolean = false
  public testForm: boolean = false
  public teacherForm: boolean = false
  public classForm: boolean = false
  public enrollmentForm: boolean = false

  public idIs: string = ''


  public theFormIs(params: any) {

    this.closeForms();

    switch (params.table) {
      case 'aluno':
        this.studentForm = true
        this.idIs = params.id
        break;

      case 'prova':
        this.testForm = true
        this.idIs = params.id
        break;
        

      case 'professor':
        this.teacherForm = true
        this.idIs = params.id

        break;

      case 'turma':
        this.classForm = true
        this.idIs = params.id

        break;

      case 'matricula':
        this.enrollmentForm = true
        this.idIs = params.id

        break;


      default:
        break;
    }


  }

  public closeForms(){
     this.studentForm = false
     this.testForm = false
     this.teacherForm = false
     this.classForm = false
     this.enrollmentForm = false
  }

}
