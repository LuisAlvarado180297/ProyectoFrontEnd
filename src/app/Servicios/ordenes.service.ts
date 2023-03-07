import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  url = environment.apiUrl;
  constructor(private http : HttpClient) { }

  
      //#region List

      ListOrdenes(){
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization' : 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
          }) 
        }
        return this.http.get(this.url + 'orders', httpOptions)
      }
  
      GetVariante(ProductoId: number, VarianteId: number){
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization' : 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
          }) 
        }
        return this.http.get(this.url + 'products/' + ProductoId.toString() + '/variants/' + VarianteId.toString(), httpOptions)
      }
      //#endregion

}
