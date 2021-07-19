export interface IMedFull{
    id:number;
    extId:string;
    nombres:string;
    apellidos:string;
    full_Name:string;
    rif: string;
    direccion: string;
    email: string;
    celular:string;
    sexo:string;
    zona:string;
    ciudad:string;
    especialidad:number;
    activo:boolean;
}
export interface IMedUp{
  medico:IMedFull;
  contrato:boolean;
  cortesia:boolean;
}
export interface ILisMed extends IMedFull{
  contrato:boolean;
  cortesia:boolean;
}
export interface ICreatedMed{
  medico:IMedFull;
  username:string;
  password:string;
  contrato:boolean;
  cortesia:boolean;
}
export interface IChangePass{
  anterior:string;
  nueva:string;
}
export interface IDocListPag{
  hasNext:boolean;
  hasPrevious:boolean;
  isFirst:boolean;
  isLast:boolean;
  list:ILisMed;
  page:number;
  perpage:number;
  totalPages:number;
  totalItems:number;
}
