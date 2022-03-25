import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('error en la ejecucion');
    //   }
    // })
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((resp) => {
    //     console.log(resp);
    //   });
    // console.log('fin init');
    this.getUsuarios().then((resp) => console.log('desde el Init', resp));
  }

  getUsuarios() {
    const promesa = new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => {
          resolve(body.data);
        });
    });

    return promesa;
  }
}
