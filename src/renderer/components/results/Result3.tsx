import '../../App.css';
import {Link} from "react-router-dom";
import InfoCard from "../InfoCard";
import ReactApexChart from "react-apexcharts";
// import {Link} from "react-router-dom";
// import ReactApexChart from "react-apexcharts"
// import TableStatic from "../TableStatic";

export default function Result3(props: any) {

  const colGraph = {

    series: [{
      name: "2000",
      data: props.result.inputsDataOld
    },{
      name: "2001",
      data: props.result.inputsDataNew
    }],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      title: {
        text: 'Náklady',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: props.result.inputs,
      },
      fill: {
        opacity: 1
      },
    },
  }

  return (
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <div className={"card-body"}>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"NÁKLADY CELKOM(" + props.result.header[0] + ")"}
                      value={props.result.costSums[0]}
                      color={"primary"}
                      icon={"fa fa-line-chart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"NÁKLADY CELKOM(" + props.result.header[1] + ")"}
                      value={props.result.costSums[1]}
                      color={"primary"}
                      icon={"fa fa-line-chart"}
            />

          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"VÝNOSY CELKOM(" + props.result.header[0] + ")"}
                      value={props.result.incomeSums[0]}
                      color={"warning"}
                      icon={"fa fa-money"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"VÝNOSY CELKOM(" + props.result.header[1] + ")"}
                      value={props.result.incomeSums[1]}
                      color={"warning"}
                      icon={"fa fa-money"}
            />
          </div>

        </div>

        <h2>Ekonomická analýza ukazovateľov</h2>

        <div className={"row"}>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"REŤAZOVÝ INDEX"}
                      value={props.result.chainIdx}
                      color={"success"}
                      icon={"fa fa-area-chart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"PERCENTO ZMENY NÁKLADOV"}
                      value={props.result.costDiff}
                      color={"primary"}
                      icon={"fa fa-shopping-cart"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"PERCENTO ZMENY VÝNOSOV"}
                      value={props.result.incomeDiff}
                      color={"warning"}
                      icon={"fa fa-dashboard"}
            />
          </div>

          <div className={"col-sm-12 col-md-6 col-lg-3"}>
            <InfoCard header={"KOEFICIENT REAKCIE"}
                      value={props.result.reaction}
                      color={"danger"}
                      icon={"fa fa-calculator"}
            />
          </div>

        </div>
      </div>

      <div>
        <div className={"card mb-3"}>
          <div className={"card-body"}>
            {   // @ts-ignore
              <ReactApexChart options={colGraph.options} series={colGraph.series} type="bar" height={400}/>
            }
          </div>
        </div>
      </div>

      <button><Link to={"/taskselect"}>Back</Link></button>
    </div>
  )
}
