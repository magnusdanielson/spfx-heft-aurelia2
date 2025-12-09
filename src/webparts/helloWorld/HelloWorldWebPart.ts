import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import strings from 'HelloWorldWebPartStrings';
import { Aurelia } from 'aurelia';
import { MyApp } from './components/my-app';
import { AppContext } from './models/app-context';
import { Registration } from '@aurelia/kernel';
export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _contextName: string = '';

  public async render(): Promise<void> {
    console.log('HelloWorldWebPart render called');
    this.domElement.innerHTML = `<div id="aurelia-${this.instanceId}" class="${this.instanceId}"  ></div>`;
    const el:HTMLElement = document.getElementById("aurelia-" + this.instanceId)!;
    const appContext = new AppContext();
    appContext.message = this._environmentMessage;
    appContext.contextName = this._contextName;

    const app = Aurelia
    .register(MyApp, Registration.instance("AppContext",appContext)) 
    .app({
      component: MyApp,
      host: el
    });

    await app.start();
    console.log('Aurelia app started');
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      console.log('Environment message:', message);
      
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }
          this._contextName = context.app.host.name;
          this._environmentMessage = environmentMessage;
          return environmentMessage;
        });
    }
    this._contextName = "SharePoint";
    this._environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
    return Promise.resolve(this._environmentMessage);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
