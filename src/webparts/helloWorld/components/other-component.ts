import { bindable } from 'aurelia';
import styles from '../HelloWorldWebPart.module.scss';

export class OtherComponent {
    private styles = styles;

    @bindable()
    public contextName: string = "";
}