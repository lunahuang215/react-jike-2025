import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({title}) => {
    const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
    title: {
        text: title
    },
    xAxis: {
        type: 'category',
        data: ['vue', 'react', 'angular', 'nodejs', 'webpack', 'babel', 'typescript']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        }
    ]
    };
    myChart.setOption(option);
  }, []);

  return (
    <div ref={chartRef} style={{ width: '800px', height: '400px' }}></div>
  )
}

export default BarChart