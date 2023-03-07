import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  IActionArguments,
  ISubmitActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'VivaConnectionsServicenowAdaptiveCardExtensionStrings';
import { IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState, LARGE_QUICK_VIEW_REGISTRY_ID } from '../VivaConnectionsServicenowAdaptiveCardExtension';

export class LargeCardView extends BasePrimaryTextCardView<IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    const buttons: ICardButton[] = [];

    if (this.state.index > -1 && this.state.incidents.result.length > 1) {
      // here we add buttons based on where we are in the paging
      if (this.state.index > 0) {
        buttons.push({
          id: "prev",
          title: strings.PrevButton,
          action: {
            type: "Submit",
            parameters: {
              id: 'prev',
              op: -1 // Decrement the index
            }
          }
        });
      }

      if (this.state.index < this.state.incidents.result.length - 1) {
        buttons.push({
          id: "next",
          title: strings.NextButton,
          action: {
            type: "Submit",
            parameters: {
              id: 'next',
              op: 1 // Increment the index
            }
          }
        });
      }


      return buttons as [ICardButton] | [ICardButton, ICardButton];
    }
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: this.state.incidents.result[this.state.index].number,
      description: this.state.incidents.result[this.state.index].short_description,
      title: this.properties.title
    };
  }

  public onAction(action: IActionArguments): void {
    const submitAction = action as ISubmitActionArguments;
    if (submitAction) {
      const { id, op } = submitAction.data;
      switch (id) {
        case 'prev':
        case 'next':
        this.setState({ index: this.state.index + op });
        break;
      }
    }
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    if (this.state.incidents?.result.length > 0) {
      return {
        type: 'QuickView',
        parameters: {
          view: LARGE_QUICK_VIEW_REGISTRY_ID
        }
      };
    }
  }
}
