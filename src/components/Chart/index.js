import React, { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import ChartContainer from './styled';

const ChartComponent = ({ labels, dataValues, title, type }) => {
  const chartRef = useRef(null);

  const theme = useContext(ThemeContext);


  useEffect(() => {
    if (dataValues.length > 0) {
      const chart = new Chart(chartRef.current, {
        type,
        data: {
          labels,
          datasets: [{
            label: title,
            data: dataValues,
            backgroundColor: theme.primary,
            borderColor: theme.secondary,
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        }
      });

      return () => chart.destroy();
    }
  }, [theme, labels, dataValues, title, type]);

  return (
    <ChartContainer>
      <canvas ref={chartRef} />
    </ChartContainer>
  )
}

ChartComponent.propTypes = {
  labels: PropTypes.instanceOf(Array).isRequired,
  dataValues: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default ChartComponent;
