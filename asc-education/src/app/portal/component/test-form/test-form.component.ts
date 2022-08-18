import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlService } from '../../services/sql.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sql: SqlService
  ) { }

  @Input() public element_id: string = ''

  //Variaveis Automaticas
  public schoolTest: Array<any> = [{ prova: 'A1', nome: 'Prova 1' }]
  public schoolClass: Array<any> = []
  public student: any = {}

  ngOnInit(): void {
    this.sql.getOne(parseFloat(this.element_id), 'aluno').subscribe(res => {

      let studentTest: any = [];

      this.student = res 


      res.turmas.forEach((turma:any) => {

        if(turma.turmaAlunos.status != 'Aprovado'){
          if(turma.provas.length != 4){
            this.schoolClass.push(turma)
          }
  
        }

        turma.provas.forEach((prova: any) => {
          
          if(prova.idAluno == res.id){
            studentTest.push(prova)
          }
        })

        
      })

    })
  }

  public schoolTestIs(){
    let value = this.testForm.controls['class_id'].value

    let provasDoAluno = this.student.provas.filter((prova:any) => { return prova.idTurma == value})
    
    this.setSchoolTest(provasDoAluno)


    
  }


  public testForm: FormGroup = this.fb.group({
    materia: ['', Validators.required],
    nota: ['', Validators.required],
    peso: [''],
    student_id: [''],
    class_id: ['']


  })

  public setSchoolTest(event: any){

    if (event.length == 0) {
      this.schoolTest = [{ prova: 'A1', nome: 'Prova 1' },]

    }
    
    if (event.length == 1) {
      this.schoolTest = [{ prova: 'A2', nome: 'Prova 2' },]

    }

    if (event.length == 2) {
      this.schoolTest = [{ prova: 'A3', nome: 'Prova 3' },]

    }

    if (event.length == 3) {
      this.schoolTest = [{ prova: 'Prova Final', nome: 'Prova Final' },]

    }


  }

  public setTestWeight() {

    let materia = this.testForm.controls['materia'].value

    let peso = this.testForm.controls['peso']

    switch (materia) {
      case 'A1':
        peso.setValue(1)
        break;

      case 'A2':
        peso.setValue(1.2)
        break;

      case 'A3':
        peso.setValue(1.4)
        break;

      case 'Prova Final':
        peso.setValue(1)
        break;

      default:
        break;
    }

  }

  public goToElementPage() {
    this.router.navigate([`/portal/aluno/${this.element_id}/aluno`])
  }

  public async submitForm() {

    await this.setTestWeight();
    await this.testForm.controls['student_id'].setValue(this.element_id)

    let value = this.testForm.value

    this.sql.newTest(value).subscribe(
      res => this.goToElementPage()
    )



  }


}
