import { Observer } from "./observer";


export interface Bobserver{

    addObserver(o:Observer) : void;

    notify() : void;

}