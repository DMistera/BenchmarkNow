import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './views/nav-menu/nav-menu.component';
import { MeasurementViewComponent } from './views/benchmark/measurement-view.component';
import { AlgorithmMeasurementComponent } from './views/benchmark/components/algorithm-measurement/algorithm-measurement.component';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { ResultsViewComponent } from './views/results-view/results-view.component';
import { ChartComponent } from './views/results-view/components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MeasurementViewComponent,
    AlgorithmMeasurementComponent,
    SettingsViewComponent,
    ResultsViewComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MeasurementViewComponent, pathMatch: 'full' },
      { path: 'results', component: ResultsViewComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsViewComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    NgxChartsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
