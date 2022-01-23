export class User{
    
  id?: string;
  nick!: string;
  bucket: string[] = [];
  menager:boolean = false;
  admin:boolean = false;
  banned:boolean = false;
        
}