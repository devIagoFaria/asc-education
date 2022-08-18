import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Module
import { PortalRoutingModule } from './portal-routing.module';


//Component
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';
import { StudentFormComponent } from './component/student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { TestFormComponent } from './component/test-form/test-form.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { ProfessoresComponent } from './pages/professores/professores.component';
import { TeacherFormComponent } from './component/teacher-form/teacher-form.component';
import { TurmasComponent } from './pages/turmas/turmas.component';
import { ClassFormComponent } from './component/class-form/class-form.component';
import { TurmaComponent } from './pages/turma/turma.component';
import { EnrollmentFormComponent } from './component/enrollment-form/enrollment-form.component';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    AlunosComponent,
    FormulariosComponent,
    StudentFormComponent,
    AlunoComponent,
    TestFormComponent,
    ProfessorComponent,
    ProfessoresComponent,
    TeacherFormComponent,
    TurmasComponent,
    ClassFormComponent,
    TurmaComponent,
    EnrollmentFormComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PortalModule { }
