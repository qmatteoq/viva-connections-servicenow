import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { VivaConnectionsServicenowPropertyPane } from './VivaConnectionsServicenowPropertyPane';
import { IncidentResult } from './models/Incidents';

export interface IVivaConnectionsServicenowAdaptiveCardExtensionProps {
  title: string;
  serviceNowUrl: string;
}

export interface IVivaConnectionsServicenowAdaptiveCardExtensionState {
  incidents: IncidentResult
}

const CARD_VIEW_REGISTRY_ID: string = 'VivaConnectionsServicenow_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'VivaConnectionsServicenow_QUICK_VIEW';

export default class VivaConnectionsServicenowAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IVivaConnectionsServicenowAdaptiveCardExtensionProps,
  IVivaConnectionsServicenowAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: VivaConnectionsServicenowPropertyPane | undefined;

  public async onInit(): Promise<void> {

    this.state = {
      incidents: null
    }

    if (this.properties.serviceNowUrl !== "") {
      await this.fetchData();
    }
    else {
      const emptyIncident: IncidentResult = {
        result: []
      };

      this.setState( {incidents: emptyIncident});
    }

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public async fetchData(): Promise<void> {
    try {

      const url = this.properties.serviceNowUrl + "/api/now/table/incident?sysparm_limit=10";

      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type":  "application/json",
          "Accept": "application/json",
          "Authorization": ""
        }
      });

      const jsonResult = await result.text();
      const incidentResult: IncidentResult = JSON.parse(jsonResult);

      this.setState( {incidents: incidentResult});
    }
    catch {
      const emptyIncident: IncidentResult = {
        result: []
      };

      this.setState({incidents: emptyIncident});
    }

     return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'VivaConnectionsServicenow-property-pane'*/
      './VivaConnectionsServicenowPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.VivaConnectionsServicenowPropertyPane();
        }
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'serviceNowUrl' && newValue !== oldValue) {
      if (newValue) {
        // eslint-disable-next-line no-void
        void this.fetchData();
      } 
    }
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
