import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'front';

  posteos;


  constructor(private http: HttpClient, private sanitized: DomSanitizer) { }



  getMensajes(){

    fetch('http://localhost/pruebasLARAVEL/blog01/back/public/api/blog')
    .then(res => res.json())
    .then(json => this.posteos=json)

  }






  borrar(event){

    console.log(event.target.attributes.id.nodeValue);

    const data = { id: event.target.attributes.id.nodeValue };

    fetch('http://localhost/pruebasLARAVEL/blog01/back/public/api/blog/'+event.target.attributes.id.nodeValue, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => console.log(res.text()))
    .then(res => this.getMensajes());


  }


  editar(event){



    if ($('button[name$="'+event.target.attributes.name.nodeValue+'"] i').attr("class") == "fas fa-pen"){

          console.log(event.target.attributes.name.nodeValue);


          $('button[name$="'+event.target.attributes.name.nodeValue+'"] i').attr("class", "fas fa-bookmark");
      
          $('button[name$="'+event.target.attributes.name.nodeValue+'"]').attr("class", "editar2");
      
          var texto = (<HTMLElement>document.getElementsByClassName(event.target.attributes.name.nodeValue)[0]).innerText;
      
      
          $("."+event.target.attributes.name.nodeValue+"").hide();
      
      
          $("."+event.target.attributes.name.nodeValue+"").after("<div><br><textarea name='"+event.target.attributes.name.nodeValue+"' style='color: black; text-align: justify; resize: none; font-size: 1.2em;' class='areaEditar' cols='35' rows='7' >"+texto+"</textarea></div>");
  

    }else{


      


          const data = { mensaje: $('textarea[name$="'+event.target.attributes.name.nodeValue+'"]').val()};

          fetch('http://localhost/pruebasLARAVEL/blog01/back/public/api/blog/'+ event.target.attributes.name.nodeValue, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(res => this.getMensajes());







    }










    
  }





  send(event){


      const data = { mensaje: (<HTMLInputElement>document.getElementById("addTextarea")).value };

      fetch('http://localhost/pruebasLARAVEL/blog01/back/public/api/blog', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(res => this.getMensajes());

      (<HTMLInputElement>document.getElementById("addTextarea")).value ="";      
      

      



  }


  ngOnInit() {


    this.getMensajes();


  }


}

