import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//PAGES
import { HomeComponent } from './pages/home/home.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';
import { ProfessoresComponent } from './pages/professores/professores.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { TurmasComponent } from './pages/turmas/turmas.component';
import { TurmaComponent } from './pages/turma/turma.component';

const routes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'alunos', component: AlunosComponent},
    {path: 'aluno/:id/:table', component: AlunoComponent},
    
    {path: 'professores', component: ProfessoresComponent},
    {path: 'professor/:id/:table', component: ProfessorComponent},

    {path: 'turmas', component: TurmasComponent},
    {path: 'turma/:id/:table', component: TurmaComponent},

    {path: 'matriculas', component: FormulariosComponent},
    {path: 'formulario/:id/:table', component: FormulariosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
