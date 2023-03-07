import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/Servicios/ordenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ordenes',
  templateUrl: './list-ordenes.component.html',
  styleUrls: ['./list-ordenes.component.css']
})
export class ListOrdenesComponent implements OnInit {

  ListOrdenes:any = [];
  
  constructor(public ordenesServie: OrdenesService) { 
  
    this.fnListOrdenes()
  }

  ngOnInit(): void {
    
  }

  fnListOrdenes(){
    this.ordenesServie.ListOrdenes().subscribe((res: any)=>{
      if(res != undefined && res.orders != undefined && res.orders.length > 0  ){ 
        // Swal.fire('Lo sentimos, no se ha obtenido ninguna información','','info')
        this.ListOrdenes = res.orders; 
      }
      else{
        Swal.fire('Lo sentimos, no se ha obtenido ninguna información','','info')
      }
    }, error=>{
      console.log(error)
    })
  }

  fnObtenerPedido(){
    alert("Hola mundo")
  }
}
