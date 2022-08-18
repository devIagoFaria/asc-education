import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sql: SqlService
  ) { }

  @Input() public element_id: string = ''

  public studentEditBoolean: boolean = false
  ngOnInit(): void {
    if(this.element_id != 'add') this.setData();
  }

  public studentForm: FormGroup = this.fb.group({
    nome: [''],
    senha: [''],
    matricula: [Math.floor(Math.random() * (999999999) + 1000000000)],
    status: ['Em andamento'],
    statusDaMatricula: ['Ativado']


  })

  public submitForm(){

    let value = this.studentForm.value

    this.sql.addOne(value, 'aluno').subscribe(
      res => {
        let newElement = res
        this.router.navigate([`/portal/aluno/${newElement.id}/aluno`])
        
      }
    )
  }

  public goToElementPage(event: any){
    this.router.navigate([`/portal/aluno/${event.id}/aluno`])
  }



  //Editação-------------------------------------------------

  public studentFormEdit: FormGroup = this.fb.group({
    nome: [''],
    senha: [''],
    matricula: [Math.floor(Math.random() * (999999999) + 1000000000)],
    status: ['Em andamento'],
    statusDaMatricula: ['Ativado']


  })

  
  public setData(){

    this.studentEditBoolean = true
    let form = this.studentFormEdit


    this.sql.getOne(parseFloat(this.element_id), 'aluno').subscribe(res=>{

      form.controls['nome'].setValue(res.nome)
      form.controls['senha'].setValue(res.senha)
      form.controls['matricula'].setValue(res.matricula)
      form.controls['status'].setValue(res.status)
      form.controls['statusDaMatricula'].setValue(res.statusDaMatricula)

    })
  
  }

  public submitFormEdit(){
    let form = this.studentFormEdit

    let value = {
      id: this.element_id,
      nome: form.controls['nome'].value,
      senha: form.controls['senha'].value,
      matricula: form.controls['matricula'].value ,
      status:  form.controls['status'].value ,
      statusDaMatricula: form.controls['statusDaMatricula'].value , 

   
    }

    

    this.sql.editOne(value, 'aluno').subscribe(
      res => {

        let newElement = res
        this.goToElementPage(newElement)
        
      }
    )
  }

}
