import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, BaseChartDirective } from 'ng2-charts';
import { CategorySummary } from 'src/app/models/categorySummary.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() data: CategorySummary[];
  @ViewChild('baseChart', { static: false }) chart: BaseChartDirective;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'right' }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit() {
    for (const expenses of this.data) {
      this.pieChartLabels.push(expenses.categoryName);
      this.pieChartData.push(expenses.sum);
    }
  }

  public refresh(newData: CategorySummary[]) {
    this.data = newData;
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartLabels = this.data.map(element => element.categoryName);
    this.pieChartData = this.data.map(element => element.sum);
    // for (const expenses of this.data) {
    //   this.pieChartLabels.push(expenses.categoryName);
    //   this.pieChartData.push(expenses.sum);
    // }
    if (this.chart !== undefined) {
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }

  }

}
