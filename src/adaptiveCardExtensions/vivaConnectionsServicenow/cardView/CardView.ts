import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  IActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'VivaConnectionsServicenowAdaptiveCardExtensionStrings';
import { IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../VivaConnectionsServicenowAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      },
      {
        title: "Open site",
        action: {
          type: 'Submit',
          parameters: {
            incidentsNumber: this.state.incidents.result.length
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: this.state.incidents.result.length.toString(),
      description: "Open incidents",
      title: this.properties.title
    };
  }

  public onAction(action: IActionArguments): void {
    if (action.type === "Submit") {
      const { incidentsNumber } = action.data;
      window.alert("There are " + incidentsNumber + " tickets");
    }
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.servicenow.com'
      }
    };
  }
}
