import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListItemDirective } from '@progress/kendo-angular-dropdowns';
import { parseNumber } from '@progress/kendo-angular-intl';
import { formulaFxIcon } from '@progress/kendo-svg-icons';
import { parse } from 'path';
import { items, Orden } from 'src/app/Modelos/Orden';
import { OrdenesService } from 'src/app/Servicios/ordenes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  
  //#region Declaracion de variables 
    FormularioProducto: any={}
    Datos: Orden;
    DatosEnvio : any={};
    DatosPais: any={};
    ListOrdenes : Orden[];
    ListItems: items[];
    OrdenId: number
    Titulo: string=""
    active = 1;
    DeshabilitarCampos: boolean= false
   //#endregion

  constructor(private route: ActivatedRoute, 
    public ordenesServie: OrdenesService) {

      this.FormularioProducto  ={}
      this.Datos = new Orden();
      this.ListOrdenes = Array<Orden>();
      this.ListItems = Array<items>();
      this.OrdenId =parseInt(route.snapshot.params["id"]) 
      if(this.OrdenId > 0){
        
        this.fnGetListDatosOrden()
this.DeshabilitarCampos= true
      } 
      else{
        this.Titulo="Nueva Orden"
        this.DeshabilitarCampos = false
        this.fnInicializarFormulalrio()
      }
   }

  ngOnInit(): void {

  }

  //#region  Funciones Generales


  //Funcion para realizar el guardado
  fnGuardar(){
    //Se validan todos los campos
    if(this.fnValidarGuardad().error){
      Swal.fire(this.fnValidarGuardad().mensaje,'','error')
      return
    }
    Swal.fire('La orden se ha guardado exitosamente','','success')

  }


  //Funcion para validar datos
  fnValidarGuardad(){
    let _res :any= {}
    _res.error=false
    _res.mensaje=""

    if(_res.error == false && ( this.DatosEnvio.firstName == undefined ||this.DatosEnvio.firstName =="" || this.DatosEnvio.lastName == undefined || this.DatosEnvio.lastName == "" ||
    this.DatosEnvio.address1 == undefined || this.DatosEnvio.address1 == "" || this.DatosEnvio.city == undefined  || this.DatosEnvio.city == ""   ||
    this.DatosEnvio.postalCode ==undefined || this.DatosEnvio.postalCode == "" || this.DatosEnvio.phone == undefined || this.DatosEnvio.phone == ""   ) ){
      _res.error=true
      _res.mensaje="Favor de captrar todos los campos que cuenten con un (*)"
      
    }
    if(_res.error== false && this.ListItems.length == 0 ){
      _res.error= true
      _res.mensaje ="Favor de capturar al menos un producto"
    }


    return _res
  }

  //Funcion para agregar el producto
  fnAgregarProducto(){
      if(this.fnValidarProducto().error){
        Swal.fire(this.fnValidarProducto().mensaje,'','error')
        return
      }

      let _item = new items();
      _item.price = this.FormularioProducto.precioUnitario    ||0
      _item.quantity = this.FormularioProducto.cantidad || 1
      _item.tax= this.FormularioProducto.impuestos   || 0 
      _item.sku = this.FormularioProducto.sku
      _item.name= this.FormularioProducto.descripcion
      _item.discount = this.FormularioProducto.descuento || 0

      this.ListItems.push(_item)
      this.fnInicializarFormulalrio()
      
  }

  //Validacion de productos de agregar
  fnValidarProducto(){
    let res: any= {}
    res.error= false
    res.mensaje=""
    if(this.FormularioProducto.sku == undefined || this.FormularioProducto.sku =='' || this.FormularioProducto.descripcion == undefined || this.FormularioProducto.descripcion == '' ||
    this.FormularioProducto.cantidad == undefined || this.FormularioProducto.cantidad == 0 ){
      res.error= true
      res.mensaje="Favor de llenar todos los campos del formulario de productos"
    }

    if(res.error == false && this.FormularioProducto.precioUnitario == 0 ){
      res.error= true
      res.mensaje="Favor de capturar un precio"
    }
    return res
  }

  //Funcion para inicializar el formulario
  fnInicializarFormulalrio(){
    this.FormularioProducto={}
    this.FormularioProducto.cantidad= 1
    this.FormularioProducto.descuento  = 0
    this.FormularioProducto.precioUnitario = 0
    this.FormularioProducto.impuestos = 0
  }

  //Funcion que obtendra los resultados
  fnObtenerResumen(){
    let _Resumen : any = {};
    _Resumen.subtotal = 0
    _Resumen.total = 0
    _Resumen.tax =  0
    _Resumen.discount =  0
    _Resumen.subtotalSinDescuento   =   0


    if(this.OrdenId > 0 ){
      
      _Resumen.subtotal =  this.Datos.totals?.subtotal || 0
      _Resumen.total = this.Datos.totals?.total || 0
      _Resumen.tax = this.Datos.totals?.tax || 0
      _Resumen.discount = this.Datos.totals?.discount || 0
      _Resumen.subtotalSinDescuento   =  parseNumber(_Resumen.subtotal)  + parseNumber(_Resumen.discount)  || 0

    }
    else{
      if(this.ListItems.length > 0 ){
        this.ListItems.forEach (item=>{
          _Resumen.subtotal += (parseNumber(item.quantity)   * parseNumber(item.price) ) || 0
          _Resumen.tax += parseNumber(item.tax) || 0
          _Resumen.discount+= parseNumber(item.discount) || 0
      _Resumen.subtotalSinDescuento   +=  parseNumber(_Resumen.subtotal)    || 0
      _Resumen.total +=   _Resumen.subtotalSinDescuento + _Resumen.tax || 0
      
        })
      }
      
    }

    _Resumen.subtotal = _Resumen.subtotal.toFixed(2)
    _Resumen.tax = _Resumen.tax.toFixed(2)
    _Resumen.discount = _Resumen.discount.toFixed(2)
    _Resumen.subtotalSinDescuento = _Resumen.subtotalSinDescuento.toFixed(2)
    _Resumen.total = _Resumen.total.toFixed(2)
    return _Resumen
  }

fnPagar(){
  Swal.fire('El pago fue exitoso','','success')
}

  fnGetListDatosOrden(){
    this.ordenesServie.ListOrdenes().subscribe((res: any)=>{
      if(res != undefined && res.orders != undefined && res.orders.length > 0  ){ 
        // Swal.fire('Lo sentimos, no se ha obtenido ninguna información','','info')
        this.ListOrdenes = res.orders;
        let _Orden = this.ListOrdenes.find( orden=>{
          return orden.id == this.OrdenId
        })

        if(_Orden != undefined){
          this.Datos = new Orden()
          this.Datos= _Orden
          this.DatosEnvio = this.Datos.shippingAddress
          this.DatosPais = this.DatosEnvio.country
          if(this.Datos.items != undefined && this.Datos.items.length > 0){
            this.ListItems = this.Datos.items;

            //Validamos la url de la imagen
            this.ListItems.forEach (item=>{
              if(item.imageUrl == undefined || item.imageUrl == null) {
                item.imageUrl="https://www.google.com.mx/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Fsearch%3Fq%3Dcarrito%2Bde%2Bcompras&psig=AOvVaw0780T4lsNLEwbdqtESJhMN&ust=1678174159188000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIjZ6obkxv0CFQAAAAAdAAAAABAG"
              }

              let _productoId= item.productId || 0
              let _varianteId = item.variantId || 0
              //Se manda a llamar la información del servicio
              this.ordenesServie.GetVariante(_productoId, _varianteId).subscribe((res: any)=>{
                if(res.length > 0 ){
                  this.Datos.variante= res.variant
                }
                
              }, error =>{
                console.log(error)
              })

            })
          }
          
          this.Titulo = "Pedido "+ this.Datos.name

        }
        else{
          this.Datos = new Orden()
          Swal.fire('No se ha logrado obtener la información','','info')
        }
        
      }
      else{
        Swal.fire('Lo sentimos, no se logro obtener la información','','error')
      }
    }, error=>{
      console.log(error)
    })
  }


  //#endregion

  
}
