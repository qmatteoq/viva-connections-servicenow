import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import { IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState } from '../VivaConnectionsServicenowAdaptiveCardExtension';

export interface ILargeQuickViewData {
  number: string;
  short_description: string;
  sys_created_on: Date;
  description: string;
  severity: string;

}

export class LargeQuickView extends BaseAdaptiveCardView<
  IVivaConnectionsServicenowAdaptiveCardExtensionProps,
  IVivaConnectionsServicenowAdaptiveCardExtensionState,
  ILargeQuickViewData
> {
  public get data(): ILargeQuickViewData {
    return {
      number: this.state.incidents.result[this.state.index].number,
      short_description: this.state.incidents.result[this.state.index].short_description,
      sys_created_on: this.state.incidents.result[this.state.index].sys_created_on,
      description: this.state.incidents.result[this.state.index].description,
      severity: this.state.incidents.result[this.state.index].severity
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/LargeQuickViewTemplate.json');
  }
}