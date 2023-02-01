import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BookingService, ChartService, CustomerService, TourService } from 'projects/global/services';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

export type ChartTurnoverOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartCustomerOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart1") chart1!: ChartComponent;
  @ViewChild("chart2") chart2!: ChartComponent;
  public chartTurnoverOptions!: Partial<ChartTurnoverOptions> | any;
  public chartCustomerOptions!: Partial<ChartCustomerOptions> | any;

  tours!: any;
  bookings!: any;
  customers!: any;
  count = {
    countTour: 0,
    countBooking: 0,
    countUser: 0,
    totalMoney: 0,
  }

  constructor(
    private tourService: TourService,
    private bookingService: BookingService,
    private customerService: CustomerService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.getChartTurnover();
    this.getCharCustomer();
    this.getTourSortByStartDate();
    this.getAllBookings();
    this.getCustomerByCreatedAt();
  }

  getTourSortByStartDate() {
    this.tourService.sortTourByStartDate().subscribe((tours: any) => {
      this.tours = [...tours];
      this.count = {...this.count, countTour: this.tours.length};
      console.log('tours', tours);
    });
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((bookings: any) => {
      this.bookings = [...bookings];
      this.count = {...this.count, countBooking: this.bookings.length};
      console.log('bookings', bookings);
      bookings.forEach((booking: any) => {
        if(booking.status) {
          this.count.totalMoney += booking.totalPrice;
        }
      });
      this.count = {...this.count, countBooking: this.bookings.length, totalMoney: this.count.totalMoney};
    });
  }

  getCustomerByCreatedAt() {
    this.customerService.sortCustomerByCreatedAt().subscribe((customers: any) => {
      this.customers = [...customers];
      this.count = {...this.count, countUser: this.customers.length};
      console.log('customers', customers);
    });
  }

  getCharCustomer() {
    this.chartService.getDataCustomerChart().subscribe((data: any) => {
      this.chartCustomerOptions = {
        series: [
          {
            name: "distibuted",
            data: data
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function(chart: any, w: any, e: any) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8",
          "#FEB019",
          "#008FFB",
          "#26a69a",
          "#775DD0"
        ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          labels: {
            style: {
              colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8",
                "#FEB019",
                "#008FFB",
                "#26a69a",
                "#775DD0"
              ],
              fontSize: "12px"
            }
          }
        }
      };
    })
  }

  getChartTurnover() {
    this.chartService.getDataTurnoverChart().subscribe((data: any) => {
      this.chartTurnoverOptions = {
        series: [
          {
            name: "Inflation",
            data: data
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: any) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          position: "top",
          labels: {
            offsetY: 0
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val: any) {
              return val;
            }
          }
        },
        title: {
          text: "",
          offsetY: 320,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    })

  }

}
