import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public menu: Array<any> = [
    {name: 'Inicio', link: ''},
    {name: 'Alunos', link: 'alunos'},
    {name: 'Professores', link: 'professores'},
    {name: 'Turmas', link: 'turmas'},
    {name: 'Matriculas', link: '/formulario/add/matricula'}
  ]

}
