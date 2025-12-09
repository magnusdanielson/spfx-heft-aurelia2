import styles from '../../HelloWorldWebPart.module.scss';
export class TeamsInbox {
    styles = styles;
    message = 'from TeamsInbox component!';
    onClick() {
       console.log(JSON.stringify(this.styles));
       console.log(styles);
        this.message = 'Button Clicked!';
    }
}