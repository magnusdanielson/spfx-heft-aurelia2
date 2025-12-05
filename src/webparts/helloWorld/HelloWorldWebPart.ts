import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import strings from 'HelloWorldWebPartStrings';
import { Aurelia } from 'aurelia';
import { TeamsInbox } from './platinaTeamsInbox/components/teams-inbox';
export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public async render(): Promise<void> {
    console.log('HelloWorldWebPart render called');
      this.domElement.innerHTML = `<div id="aurelia-${this.instanceId}" class="${this.instanceId}"  >
    <teams-inbox class="${styles.helloWorld}">Loading...</teams-inbox></div>`;

    // bootstrap(async (aurelia:Aurelia) =>  {
    //       aurelia.use
    //         .standardConfiguration()
    //         .developmentLogging()
    //         .globalResources(
    //           [
    //             // It is required to register the first component teams 
    //             // since it can not be referenced with <require>
    //             PLATFORM.moduleName('webparts/platinaTeamsInbox/components/TeamsInbox'),
                
    //         ]);

    //         // const originalLoadText = aurelia.loader.loadText.bind(aurelia.loader);
    //         // async function monkeyPatchLoadText (url: string): Promise<string> {
    //         //   // if (/^AdminTheme\//.test(url)) {
    //         //   //     url = url.replace('AdminTheme', '/src/AdminTheme');
    //         //   // }
    //         //   console.log(url);
    //         //   return await originalLoadText(url);
    //         // }
    //         // // Apply monkey patch
    //         // aurelia.loader.loadText = monkeyPatchLoadText;
    //       var el:HTMLElement = document.getElementById(this.instanceId)!;
    //       await aurelia.start();

    //       // We are registering the WebPartContext so it can be injected into your component
    //       // If you need the this.context in your component, just @inject("WebPartContext") in your component
    //       aurelia.container.registerInstance("WebPartContext", this.context);

    //       if (this.context.sdks.microsoftTeams) {
    //         // We have teams context for the web part
    //         let siteTabTitle = "We are in the context of following Team: " + this.context.sdks.microsoftTeams.context.teamName;
    //         aurelia.container.registerInstance("TeamsContext", this.context.sdks.microsoftTeams.context);
    //       }
    //       else {
    //         // We are rendered in normal SharePoint context
    //         let siteTabTitle = "We are in the context of following site: " + this.context.pageContext.web.title;
    //         aurelia.container.registerInstance("TeamsContext", null);
    //       }

    //       let templatingEngine = aurelia.container.get(TemplatingEngine);

    //       // Let's enhance all Aurelia components within the div
    //       templatingEngine.enhance({
    //         container: aurelia.container,
    //         element: el,
    //         resources: aurelia.resources
    //       });
    //     }
    //   );

    var el:HTMLElement = document.getElementById("aurelia-" + this.instanceId)!;
    console.log('Enhancing Aurelia component in element:', el);
    // const enhanceRoot = await Aurelia.enhance({
    //   host: el,
    //   component: { message: 'Hello World' }
    // });
    //console.log('Aurelia component enhanced:', enhanceRoot);

    let app = Aurelia
    .register(TeamsInbox) 
  .app({
    component: TeamsInbox,
    host: el
  });

    await app.start();
    console.log('Aurelia app started:', app);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
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

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
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
