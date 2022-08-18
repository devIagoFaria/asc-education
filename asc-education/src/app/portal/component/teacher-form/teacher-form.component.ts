import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sql: SqlService
  ) { }

  @Input() public element_id: string = ''

  //Variaveis Mutaveis
  public table: string = 'professor'


  //Variaveis Não Mutaveis
  public editBoolean: boolean = false

  ngOnInit(): void {

    if(this.element_id != 'add'){
       this.setData();
      }
  }

  public teacherForm: FormGroup = this.fb.group({
    nome: [''],
    cpf: [''],
    status: ['Ativado'],
    senha: ['']

  })

  public goToElementPage(){
    this.router.navigate([`/portal/${this.table}/${this.element_id}/${this.table}`])
  }

  public async submitForm(){

    let value = this.teacherForm.value

    this.sql.addOne(value, this.table).subscribe(
      res => {
        this.element_id = res.id
        this.goToElementPage()}
    )


  }

  //EDIÇÃO--------------------------------------------

  public teacherEditForm: FormGroup = this.fb.group({
    nome: [''],
    cpf: [''],
    status: ['Ativado'],
    senha: ['']

  })

  public setData(){
    this.editBoolean = true
    let form = this.teacherEditForm


    this.sql.getOne(parseFloat(this.element_id), 'professor').subscribe(res=>{

    

      form.controls['nome'].setValue(res.nome)
      form.controls['cpf'].setValue(res.cpf)
      form.controls['senha'].setValue(res.senha)

      form.controls['status'].setValue(res.status)

    })
  
  }

  public async submitEditForm(){
    let form = this.teacherEditForm

    let value =  {
      id: this.element_id,
      nome: form.controls['nome'].value,
      cpf: form.controls['cpf'].value,
      senha: form.controls['senha'].value ,
      status:  form.controls['status'].value ,

   
    }

    this.sql.editOne(value, this.table).subscribe(
      res => {
        this.element_id = res.id
        this.goToElementPage()}
    )


  }

}
