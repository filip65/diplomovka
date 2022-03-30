import TableStatic from '../TableStatic';
import ReactApexChart from 'react-apexcharts';

export default function Result5(props: any) {
  let series = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    // @ts-ignore
    series.push({
      name: props.result.headers[index].toString(),
      data: [props.result.rentIncome[index], props.result.rentCost[index]],
    });
  }

  let series2: any[] = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    // @ts-ignore
    series2.push({
      name: props.result.headers[index].toString(),
      data: [props.result.marginGross[index]],
    });
  }

  let series3: any[] = [];
  for (let index = 0; index < props.result.headers.length; index++) {
    // @ts-ignore
    series3.push({
      name: props.result.headers[index].toString(),
      data: [props.result.allowance[index]],
    });
  }

  // let series4: any[] = [];
  // for (let index = 0; index < props.result.headers.length; index++) {
  //   // @ts-ignore
  //   series4.push({
  //     name: props.result.headers[index].toString(),
  //     data: [props.result.marginProfit[index]],
  //   });
  // }

  // let series5: any[] = [];
  // for (let index = 0; index < props.result.headers.length; index++) {
  //   // @ts-ignore
  //   series5.push({
  //     name: props.result.headers[index].toString(),
  //     data: [props.result.profit[index]],
  //   });
  // }

  const colGraph = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Rentabilita tržieb', 'Rentabilita nákladov'],
      },
      fill: {
        opacity: 1,
      },
    },
  };

  const colGraph2 = {
    // @ts-ignore
    // series: series2,
    series: [{
      data: props.result.marginGross,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '75%',
          endingShape: 'rounded',
          distributed: true,
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        // categories: ['Hrubé rozpätie'],
        categories: props.result.headers
      },
      yaxis: [{
        title: {
          text: 'ekonomický ukazovateľ (€)',
        },

      }],
      fill: {
        opacity: 1,
      },
    },
  };

  const colGraph3 = {
    // @ts-ignore
    series: series3,
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Príspevok na úhradu'],
      },
      yaxis: [{
        title: {
          text: 'ekonomický ukazovateľ (€)',
        },

      }],
      fill: {
        opacity: 1,
      },
    },
  };

  // const colGraph4 = {
  //   // @ts-ignore
  //   series: series4,
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded',
  //       },
  //     },
  //     title: {
  //       text: 'Zisková prirážka',
  //       align: 'center',
  //     },
  //     grid: {
  //       borderColor: '#e7e7e7',
  //       row: {
  //         colors: ['#f3f3f3', 'transparent'],
  //         opacity: 0.5,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ['transparent'],
  //     },
  //     xaxis: {
  //       categories: ['Zisková prirážka'],
  //     },
  //     fill: {
  //       opacity: 1,
  //     },
  //   },
  // };

  // const colGraph5 = {
  //   // @ts-ignore
  //   series: series5,
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded',
  //       },
  //     },
  //     title: {
  //       text: 'Zisk',
  //       align: 'center',
  //     },
  //     grid: {
  //       borderColor: '#e7e7e7',
  //       row: {
  //         colors: ['#f3f3f3', 'transparent'],
  //         opacity: 0.5,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ['transparent'],
  //     },
  //     xaxis: {
  //       categories: ['Zisk'],
  //     },
  //     fill: {
  //       opacity: 1,
  //     },
  //   },
  // };

  return (
    <div>

      <h1 className={"result-h1"}>Ukazovatele sortimentnej analýzy</h1>

      <div
        className={"table-card"}
      >
        <TableStatic
          corner={"Ukazovatele sortimentnej analýzy"}
          header={[...props.result.headers]}
          inputs={[
            'Rentabilita tržieb(%)',
            'Rentabilita nákladov(%)',
            'Hrubé rozpätie(€)',
            'Príspevok na úhradu(€)',
          ]}
          data={[
            [
              ...props.result.rentIncome.map(
                (value: number) => Math.round(value * 100)
              ),
            ],
            [
              ...props.result.rentCost.map(
                (value: number) => Math.round(value * 100)
              ),
            ],
            [
              ...props.result.marginGross.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...props.result.allowance.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
          ]}
        />
      </div>

      <div
        className={"table-card"}
      >
        <TableStatic
          corner={"Ukazovatele sortimentnej analýzy"}
          header={[...props.result.headers]}
          inputs={['Zisková prirážka(€)', 'Zisk pri pôvodnej výrobnej štruktúre(€)']}
          data={[
            [
              ...props.result.marginProfit.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
            [
              ...props.result.profit.map(
                (value: number) => Math.round(value * 100) / 100
              ),
            ],
          ]}
        />
      </div>

      <h1 className={"result-h1"}>Dashboarding</h1>

      <div
        className={"graph-card"}
      >
        <h4 className={"graph-title"}>UKAZOVATELE SORTIMENTNEJ ANALÝZY</h4>
        {
          // @ts-ignore
          <ReactApexChart options={colGraph.options}
                          series={colGraph.series}
                          type="bar"
                          height={400}
          />
        }
      </div>

      <div className={"row"}>
        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginRight:25}}
          >
            <h4 className={"graph-title"}>HRUBÉ ROZPÄTIE</h4>
            {
              // @ts-ignore
              <ReactApexChart options={colGraph2.options}
                              series={colGraph2.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>

        <div className={"col-6"}>
          <div
            className={"graph-card"}
            style={{marginLeft:25}}
          >
            <h4 className={"graph-title"}>PRÍSPEVOK NA ÚHRADU</h4>
            {
              // @ts-ignore
              <ReactApexChart options={colGraph3.options}
                              series={colGraph3.series}
                              type="bar"
                              height={400}
              />
            }
          </div>
        </div>
      </div>

      {/*<div>*/}
      {/*  <div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        backgroundColor: 'white',*/}
      {/*        padding: 25,*/}
      {/*        marginTop: 30,*/}
      {/*        boxShadow: '0px 0px 10px lightgray',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {*/}
      {/*        // @ts-ignore*/}
      {/*        <ReactApexChart options={colGraph4.options}*/}
      {/*                        series={colGraph4.series}*/}
      {/*                        type="bar"*/}
      {/*                        height={400}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        backgroundColor: 'white',*/}
      {/*        padding: 25,*/}
      {/*        marginTop: 30,*/}
      {/*        boxShadow: '0px 0px 10px lightgray',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {*/}
      {/*        // @ts-ignore*/}
      {/*        <ReactApexChart options={colGraph5.options}*/}
      {/*                        series={colGraph5.series}*/}
      {/*                        type="bar"*/}
      {/*                        height={400}*/}
      {/*        />*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
