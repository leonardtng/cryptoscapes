import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinMarketChartList } from '../../../../features/coinMarketChartListSlice';
import { Coin, CoinMarketChart } from '../../../../models';
import ReactApexChart from "react-apexcharts";
import { selectCoins } from '../../../../features/coinsSlice';
import { useTheme } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import { pearsonCorrelation, roundDecimals } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    padding: theme.spacing(3),
    '& .apexcharts-heatmap-rect:hover': {
      cursor: 'pointer'
    },
    '& .apexcharts-menu-item:hover': {
      backgroundColor: `${theme.palette.secondary.main}15`
    },
    '& .apexcharts-legend-series': {
      display: 'inline !important'
    },
    '& .custom-tooltip': {
      padding: 12,
      backgroundColor: `${theme.palette.background.default}dd`,
      '& .header': {
        color: theme.palette.text.secondary

      },
      '& .content': {
        color: theme.palette.text.primary
      }
    }
  }
}));

interface DataFormat {
  name: string;
  data: number[]
}

const CorrelationHeatmap: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  const top15Ids = Object.keys(coinMarketChartList.value[coinMarketChartList.selectedDayRange]);

  const formatRawData = (dataKey: keyof CoinMarketChart) => {
    const correlationHeatmapSeries: DataFormat[] = [];
    const fullSeries: number[][] = [];

    top15Ids.forEach((coinId: string) => {
      const chartData: number[] = [];
      coinMarketChartList.value[coinMarketChartList.selectedDayRange][coinId][dataKey]
        .forEach((dataPair: [number, number]) => {
          chartData.push(dataPair[1]);
        });
      fullSeries.push(chartData)
    });

    for (var coinId1 of top15Ids) {
      const coinCorrelations: number[] = [];
      for (var coinId2 of top15Ids) {
        coinCorrelations.push(
          roundDecimals(pearsonCorrelation(fullSeries, top15Ids.indexOf(coinId1), top15Ids.indexOf(coinId2)) * 100, 1)
        )
      }
      correlationHeatmapSeries.push({
        name: coins.value[top15Ids.indexOf(coinId1)].symbol.toUpperCase(),
        data: coinCorrelations
      })
    }
    return correlationHeatmapSeries
  };

  const data: DataFormat[] = formatRawData(coinMarketChartList.selectedDataType);

  const options: ApexOptions = {
    chart: {
      id: 'CryptoscapesCorrelationHeatmap',
      height: '100%',
      fontFamily: 'Gilroy, sans-serif',
      type: 'heatmap',
      background: theme.palette.card.default,
      animations: {
        speed: 1000,
      }
    },
    theme: {
      mode: 'dark'
    },
    tooltip: {
      custom: (data) => {
        const value = data.series[data.seriesIndex][data.dataPointIndex]
        return `<div class="custom-tooltip">
        <div class="header">${coins.value[data.seriesIndex].name} vs ${coins.value[data.dataPointIndex].name}</div>
        <div class="content">Correlation: ${value}</div>
        </div>`
      }
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '20px'
      }
    },
    legend: {
      fontSize: '14px'
    },
    colors: ["#000000"],
    xaxis: {
      categories: coins.value.slice(0, 15).map((coin: Coin) => coin.symbol.toUpperCase()),
      tooltip: {
        enabled: false
      },
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`
        }
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [{
            from: -100,
            to: 9.999999999,
            name: 'Almost None (<10)',
            color: theme.palette.success.main,
          },
          {
            from: 10,
            to: 69.999999999,
            name: 'Medium (<70)',
            color: theme.palette.info.main
          },
          {
            from: 70,
            to: 84.999999999,
            name: 'High (<85)',
            color: theme.palette.warning.main
          },
          {
            from: 85,
            to: 99.999999999,
            name: 'Extreme (<99.999)',
            color: theme.palette.error.main
          }],
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      <ReactApexChart options={options} series={data} type="heatmap" height="100%" />
    </div>
  )
}

export default CorrelationHeatmap
