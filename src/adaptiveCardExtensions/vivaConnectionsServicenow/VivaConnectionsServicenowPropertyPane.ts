import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'VivaConnectionsServicenowAdaptiveCardExtensionStrings';

export class VivaConnectionsServicenowPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('serviceNowUrl', {
                  label: strings.ServiceNowUrlLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
