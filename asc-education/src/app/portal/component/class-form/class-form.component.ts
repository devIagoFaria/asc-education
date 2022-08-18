import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sql: SqlService
  ) { }

  @Input() public element_id: string = ''

  //Variaveis Mutaveis
  public table: string = 'turma'

  //Variaveis Não Mutaveis
  public editBoolean: boolean = false
  public teachers: Array<any> = []



  ngOnInit(): void {

    this.getTeachers();
    if(this.element_id != 'add'){
       this.setData();
      }
  }

  public classForm: FormGroup = this.fb.group({
    materia: ['', Validators.required],
    teacher_id: ['', Validators.required],

  })

  public getTeachers(){
    this.sql.getList('professor').subscribe(
      res => { this.teachers = res}
    )
  }

  public goToElementPage(){
    this.router.navigate([`/portal/${this.table}/${this.element_id}/${this.table}`])
  }

  public async submitForm(){

    let value = this.classForm.value

    this.sql.addOne(value, this.table).subscribe(
      res => {
        this.element_id = res.id
        this.goToElementPage()}
    )


  }

  //EDIÇÃO--------------------------------------------

  public classEditForm: FormGroup = this.fb.group({
    materia: [''],
    teacher_id: [''],

  })

  public setData(){
    this.editBoolean = true
    let form = this.classEditForm


    this.sql.getOne(parseFloat(this.element_id), this.table).subscribe(res=>{
      form.controls['materia'].setValue(res.materia)
      form.controls['teacher_id'].setValue(res.idProfessor)

    })
  
  }

  public async submitEditForm(){

    let form = this.classEditForm

    let value = {
      materia: form.controls['materia'].value,
      teacher_id: form.controls['teacher_id'].value,
      id: this.element_id,
    }

    this.sql.editOne(value, this.table).subscribe(
      res => {
        
        this.element_id = res.id
        this.goToElementPage()}
    )


  }


}
