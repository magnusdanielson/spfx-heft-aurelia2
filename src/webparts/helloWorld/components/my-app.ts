import styles from '../HelloWorldWebPart.module.scss';
import { AppContext } from '../models/app-context';
import {  inject } from '@aurelia/kernel';

@inject("AppContext")
export class MyApp {
    constructor(private appContext:AppContext)
    {
        console.log('MyApp component initialized with AppContext:', appContext);
    }
    styles = styles;
    message = ', great!';
    onClick() {
       console.log(styles);
        this.message = 'Button Clicked!';
    }
}