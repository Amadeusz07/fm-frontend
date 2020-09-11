import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, BaseChartDirective, Color } from 'ng2-charts';
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
  public pieChartColors = [
    {
      backgroundColor: ['#1f77b4', '#e377c2', '#ff7f0e', '#2ca02c', '#bcbd22', '#d62728',
        '#17becf', '#9467bd', '#7f7f7f', '#8c564b', '#3366cc']
    } as Color
  ];

  constructor() { }

  ngOnInit() {
    this.pieChartLabels = this.data.map(element => element.categoryName);
    this.pieChartData = this.data.map(element => element.sum);
  }

  public refresh(newData: CategorySummary[]) {
    this.data = newData;
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartLabels = this.data.map(element => element.categoryName);
    this.pieChartData = this.data.map(element => element.sum);
    this.chart.update();

  }

}
