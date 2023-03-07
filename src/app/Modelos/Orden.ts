
export class Orden{
    public id : number;
    public number: number;
    public marketPlaceId?: number;
    public groupId? : number;
    public name: string;
    public packsId?: number;
    public email?: string;
    public fulfillmentStatus? : fulfillmentStatus;
    public currency? : string
    public totals? : totalMontos;
    public taxesIncluded? : boolean;
    public taxLines? :Array<any>;
    public units?: units
    public status? : status;
    public locationId? : number;
    public reference? : string
    public tags? : Array<any>
    public payment?  : payment;
    public customer?: any
    public refunds?: Array<any>
    public billingAddress? : billingAddress
    public logistic? : logistic
    public shippingMethod? : string
    public shippingOptionReference? : string
    public shippingLabel?: string
    public shippingAddress? : shippingAddress
    public items? : Array<items>
    public packages? : Array<any>
    public meta?: string 
    public dates? : dates
    public cancelReason?: string
    public note?: string
    public locations?: Array<any>
    public localizationExtensions?: Array<any>
    public checkoutId?: number
    public variante?: variante
    constructor(){
        this.id=0;
        this.number= 0 ;
        this.name="";
        this.billingAddress = new  billingAddress() 
    }
}

export class dates{
    public deliveredAt?: string
    public canceledAt?: string
    public closedAt?: string
    public createdAt?: Date
    public updatedAt?: Date
    public paidAt?: Date
}
export class items{
    public id? : number
    public variantId?: number
    public productId? : number
    public offerId?: number
    public inventoryId?: number
    public sku?: string
    public fulfillment?: fulfillment
    public name? : string
    public upc? : string
    public requiresShipping?: boolean
    public quantity?: number
    public currentQuantity?:number
    public price?:number
    public discount?: number
    public associatedItems?: Array<any>
    public bundled?: boolean
    public tax?: number 
    public taxable?: boolean
    public weigh?:number
    public vendor?: string
    public imageUrl?: string
    public ecartapiUrl?: string

}

export class fulfillment{
    public quantity?: number
    public service? : string
    public status?: string
}
export class logistic{
    public mode? : string
    public type?: string
    public free? : boolean
    public direction? : string
}

export class shippingAddress{
    public id?: number
    public firstName? : string
    public lastName? : string
    public dni?: string 
    public identificationNumber? : string
    public address1? : string
    public address2? : string
    public address3? : string
    public country? : country
    public state?: state
    public city? : string
    public postalCode?: string
    public phone?: string
    public email? : string 
    public company?: string
    public references? : string
}
export class billingAddress {
    public id?: number
    public firstName? : string
    public lastName? : string
    public dni?: string 
    public identificationNumber? : string
    public address1? : string
    public address2? : string
    public address3? : string
    public country? : country
    public state?: state
    public city? : string
    public postalCode?: string
    public phone?: string
    public email? : string 
    public company?: string
    public references? : string

    constructor(){
        this.firstName=""
        this.lastName=""
    }
}

export class state {
    public code? : string
    public name? : string
    public codeIso2? : string
    public codeIso3? : string
}

export class country {
    public code?: string
    public name?: string
    public codeIso2? : string
    public codeIso3? : string 

}
export class payment{
    public method? : string
    public status? : string
    public ecartapi? : string
}

export class status{
    public id?: number
    public status? : string
    public financial?: string 
    public ecartapi?: string
    public ecartapiId?: number
}


export class fulfillmentStatus{
    public id?: number;
    public status? : string
    public ecartapi?: string
    public ecartapiId? : number
    public partiallAvailable? : boolean
}


export class totalMontos {
    public subtotal?: number
    public total? : number
    public tax? : number
    public discount?: number
    public weight? : number
    public shipping? : number
    constructor(){
        this.subtotal=0
        this.total = 0
        this.tax = 0
        this.discount = 0
        this.weight= 0
        this.shipping=0
    }
}

export class dimensions{
    public width?: number
    public height?: number
    public length?: number
    public weight? : number
}

export class units{
    public width?: number
    public height?: number
    public length?: number
    public weight? : number

}
export class inventory{
    public itemId?: number
    public quantity? : number
}
export class variante {
    public id?: number
    public productId?: number
    public name? : string
    public upc? : string
    public price? : number
    public currency? : string
    public sku?: string
    public imageId?: number
    public fulfillmentService?: string
    public option1?: string
    public option2?: string
    public option3?: string
    public dimensions? : dimensions
    public units? : units
    public inventory?: inventory
    public requireShipping?: boolean
    public bundled?: boolean
    public dates? : dates
    
    public countryCodeOrigin?: string
    public provinceCodeOrigin?: string
    public harmonizedSystemCode?: string
    public countryHarmonizedSystemCode?: string
}