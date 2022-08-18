import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit {

  
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
  public students: Array<any> = []
  public classes: Array<any> = []



  ngOnInit(): void {

    this.getStudents();
    this.getClasses();
  }

  public enrollmentForm: FormGroup = this.fb.group({
    materia: ['', Validators.required],
    student: ['', Validators.required],

  })

  public getStudents(){

    this.sql.getList('aluno').subscribe(
      res => { 
        this.students = res
        this.students.sort((a:any,b:any ) => {
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

  public getClasses(){
    
    this.sql.getList('turma').subscribe(
      res => { this.classes = res}
    )
  }

  public goToElementPage(){
    this.router.navigate([`/portal/${this.table}/${this.element_id}/${this.table}`])
  }

  public async submitForm(){

    let value = {
      student_id: this.enrollmentForm.controls['student'].value,
      class_id: this.enrollmentForm.controls['materia'].value
    
    }

    this.sql.newEnrollment(value, this.table).subscribe(
      res => {
        this.element_id = res.id
        this.goToElementPage()}
    )


  }

}
