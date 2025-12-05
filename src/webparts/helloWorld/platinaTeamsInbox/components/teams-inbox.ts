import styles from './teams-inbox.css';
export class TeamsInbox {
    styles = styles;
    message = 'from TeamsInbox component!';
    onClick() {
        console.log(this.styles);
        this.message = 'Button Clicked!';
    }
}