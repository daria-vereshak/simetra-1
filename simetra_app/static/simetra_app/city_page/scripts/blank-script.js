"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const featureGroups = JSON.parse(citiesUnparsed[0]);

const qualityGroups = Object.entries(
    JSON.parse(featureGroups["КАЧЕСТВЕННЫЕ ГРУППЫ"][0])
  ),
  spatialCharacteristics = Object.entries(
    JSON.parse(featureGroups["ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ"][0])
  ),
  rollinStock = Object.entries(
    JSON.parse(featureGroups["ПОДВИЖНОЙ СОСТАВ"][0])
  ),
  routes = Object.entries(JSON.parse(featureGroups["МАРШРУТЫ"][0])),
  tariffSystem = Object.entries(
    JSON.parse(featureGroups["ТАРИФНАЯ СИСТЕМА"][0])
  );

const citiesAttrVerboseNameUnparsed = JSON.parse(
  document.getElementById("city_attr_verbose_names_list_json").textContent
);
const cityAttributeName = JSON.parse(citiesAttrVerboseNameUnparsed[0]);

function generateDatas(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    if (arrField[i][1] !== 0) {
      data.push(arrField[i][1]);
    }
  }
  return data;
}

function generateLabels(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    if (arrField[i][1] !== 0) {
      const buffName = arrField[i][0];
      data.push(cityAttributeName[`${buffName}`]);
    }
  }
  return data;
}

/*-------------------------------------------------------------*/
/*-----Polar Area----------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewPolarArea(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        label: "Dataset 1",
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
        ],
      },
    ],
  };

  const config = {
    type: "polarArea",
    data: data,

    // overrides: {
    //   plugins: {
    //     tooltip: {
    //       caretSize: 40,
    //     },
    //   },
    // },
    options: {
      responsive: true,
      // scales: {
      //   myScale: {
      //     type: 'logarithmic',
      //     position: 'right', // `axis` is determined by the position as `'y'`
      //   }
      // },
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            // color: '#ffffff',
            font: {
              size: 20,
            },
          },
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Pie-----------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewPie(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
        ],
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Doughnut------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewDoughnut(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
        ],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Multi Series Pie----------------------------------------*/
/*-------------------------------------------------------------*/

function createNewMultiSeriesPie(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        backgroundColor: ["#33C2C7", "#60EEC4"],
        data: [21, 79],
      },
      {
        backgroundColor: ["#FF9840", "#FFB270"],
        data: [33, 67],
      },
      {
        backgroundColor: ["#456DD0", "#93ABE8"],
        data: [20, 80],
      },
      {
        backgroundColor: ["#39E143", "#163788"],
        data: [10, 90],
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          labels: {
            font: {
              size: 20,
            },
            generateLabels: function (chart) {
              const original =
                Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const labelsOriginal = original.call(this, chart);

              var datasetColors = chart.data.datasets.map(function (e) {
                return e.backgroundColor;
              });
              datasetColors = datasetColors.flat();

              labelsOriginal.forEach((label) => {
                label.datasetIndex = (label.index - (label.index % 2)) / 2;

                label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                label.fillStyle = datasetColors[label.index];
              });

              return labelsOriginal;
            },
          },
          onClick: function (mouseEvent, legendItem, legend) {
            legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden =
              legend.chart.isDatasetVisible(legendItem.datasetIndex);
            legend.chart.update();
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const labelIndex = context.datasetIndex * 2 + context.dataIndex;
              return (
                context.chart.data.labels[labelIndex] +
                ": " +
                context.formattedValue
              );
            },
          },
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
/*-----Creating charts-----------------------------------------*/
/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewChart(nameGroup, index) {
  const newChart = document.createElement("canvas");
  const groupContainer = document.querySelector(`.${nameGroup}__container`);
  newChart.id = `${nameGroup}-${index}`;
  groupContainer.appendChild(newChart);
}
/*-------------------------------------------------------------*/
/*-----Quality-------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("quality", 1);
new Chart(
  document.getElementById("quality-1"),
  createNewPolarArea(qualityGroups, 0, 5)
);
/*-------------------------------------------------------------*/
/*-----Spatial-------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("spatial", 1);
new Chart(
  document.getElementById("spatial-1"),
  createNewPie(spatialCharacteristics, 0, 5)
);

createNewChart("spatial", 2);
new Chart(
  document.getElementById("spatial-2"),
  createNewDoughnut(spatialCharacteristics, 5, 10)
);

createNewChart("spatial", 3);
new Chart(
  document.getElementById("spatial-3"),
  createNewDoughnut(spatialCharacteristics, 10, 15)
);

createNewChart("spatial", 4);
new Chart(
  document.getElementById("spatial-4"),
  createNewDoughnut(spatialCharacteristics, 15, 20)
);

createNewChart("spatial", 5);
new Chart(
  document.getElementById("spatial-5"),
  createNewDoughnut(spatialCharacteristics, 25, 30)
);

/*-------------------------------------------------------------*/
/*-----Rolling stock-------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("rolling-stock", 1);
new Chart(
  document.getElementById("rolling-stock-1"),
  createNewPie(spatialCharacteristics, 0, 5)
);

createNewChart("rolling-stock", 2);
new Chart(
  document.getElementById("rolling-stock-2"),
  createNewDoughnut(rollinStock, 5, 10)
);

createNewChart("rolling-stock", 3);
new Chart(
  document.getElementById("rolling-stock-3"),
  createNewDoughnut(rollinStock, 10, 15)
);

createNewChart("rolling-stock", 4);
new Chart(
  document.getElementById("rolling-stock-4"),
  createNewDoughnut(rollinStock, 15, 20)
);

createNewChart("rolling-stock", 5);
new Chart(
  document.getElementById("rolling-stock-5"),
  createNewDoughnut(rollinStock, 25, 30)
);

createNewChart("rolling-stock", 6);
new Chart(
  document.getElementById("rolling-stock-6"),
  createNewDoughnut(rollinStock, 30, 35)
);

createNewChart("rolling-stock", 7);
new Chart(
  document.getElementById("rolling-stock-7"),
  createNewDoughnut(rollinStock, 35, 40)
);

createNewChart("rolling-stock", 8);
new Chart(
  document.getElementById("rolling-stock-8"),
  createNewDoughnut(rollinStock, 40, 42)
);

//33C2C7
//60EEC4

/*-------------------------------------------------------------*/
/*-----Routes--------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("routes", 1);
new Chart(document.getElementById("routes-1"), createNewPie(routes, 0, 5));

createNewChart("routes", 2);
new Chart(
  document.getElementById("routes-2"),
  createNewDoughnut(routes, 5, 10)
);

createNewChart("routes", 3);
new Chart(
  document.getElementById("routes-3"),
  createNewDoughnut(routes, 10, 15)
);

createNewChart("routes", 4);
new Chart(
  document.getElementById("routes-4"),
  createNewDoughnut(routes, 15, 20)
);

createNewChart("routes", 5);
new Chart(
  document.getElementById("routes-5"),
  createNewDoughnut(routes, 25, 29)
);

/*-------------------------------------------------------------*/
/*-----Tariff--------------------------------------------------*/
/*-------------------------------------------------------------*/
createNewChart("tariff", 1);
new Chart(document.getElementById("tariff-1"), createNewPie(routes, 0, 5));

createNewChart("tariff", 2);
new Chart(
  document.getElementById("tariff-2"),
  createNewDoughnut(tariffSystem, 5, 10)
);

createNewChart("tariff", 3);
new Chart(
  document.getElementById("tariff-3"),
  createNewDoughnut(tariffSystem, 10, 15)
);

createNewChart("tariff", 4);
new Chart(
  document.getElementById("tariff-4"),
  createNewDoughnut(tariffSystem, 15, 16)
);
