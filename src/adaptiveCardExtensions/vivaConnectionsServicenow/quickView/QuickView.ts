import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import { Result } from '../models/Incidents';
import { IVivaConnectionsServicenowAdaptiveCardExtensionProps, IVivaConnectionsServicenowAdaptiveCardExtensionState } from '../VivaConnectionsServicenowAdaptiveCardExtension';

export interface IQuickViewData {
  incidents: Result[];
}

export class QuickView extends BaseAdaptiveCardView<
  IVivaConnectionsServicenowAdaptiveCardExtensionProps,
  IVivaConnectionsServicenowAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      incidents: this.state.incidents.result
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}