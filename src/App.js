import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import GlobalStyle, { ChartsContainer, AppContainer, SelectsContainer, MainContainer, LoadingContainer, ErrorContainer } from './styles/GlobalStyles';
import darkTheme from './styles/themes/dark';
import lightTheme from './styles/themes/light';

import Header from './components/Header';
import Chart from './components/Chart';
import Select from './components/Select';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const chartTypes = ['bar', 'line'];

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState(null);
  const [dataShow, setDataShow] = useState(null);
  const [currentLabels, setCurrentLabels] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [currentChartType, setCurrentChartType] = useState('bar');

  const themeToggler = () => {
    // eslint-disable-next-line no-unused-expressions
    theme.title === 'light' ? setTheme(darkTheme) : setTheme(lightTheme);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://covid19-api.vost.pt/Requests/get_full_dataset');

        // eslint-disable-next-line camelcase
        const { confirmados_novos, obitos, data, recuperados, confirmados } = response.data;

        const organizedFullData = [];

        Object.keys(data).forEach(day => {
          const formatedDate = response.data.data[day].replace(/-/g, '/');
          const month = moment(formatedDate, 'DD/MM/YYYY', true).format('MMMM');

          organizedFullData.push({
            month,
            date: data[day],
            deaths: obitos[day],
            deathsPerDay: obitos[day] - (obitos[parseInt(day, 10) - 1] || 0),
            newCases: confirmados_novos[day],
            totalCases: confirmados[day],
            recovered: recuperados[day],
            recoveredPerDay: recuperados[day] - (recuperados[parseInt(day, 10) - 1] || 0),
          });
        })

        setFullData(organizedFullData);

      } catch (e) {
        // Do Something
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!fullData) return;
    const filteredData = fullData.filter(data => data.month === currentMonth);

    const currentLabelsAux = [];
    filteredData.forEach(data => currentLabelsAux.push(data.date));

    setCurrentLabels(currentLabelsAux);
    setDataShow(filteredData);
  }, [currentMonth, fullData]);

  const selectData = (field) => {
    const fieldData = [];
    dataShow.map(data => fieldData.push(data[field]));

    return fieldData;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <Header themeToggler={themeToggler} />
        <MainContainer>
          <SelectsContainer>
            <Select
              defaultValue={currentMonth}
              options={months}
              type="monthSelect"
              changeHandler={(e) => setCurrentMonth(e.target.innerHTML)}
            />
            <Select
              defaultValue={currentChartType}
              options={chartTypes}
              changeHandler={(e) => setCurrentChartType(e.target.innerHTML)}
            />
          </SelectsContainer>
          {
            loading
              ? <LoadingContainer>
                  <h2>Loading ...</h2>
                </LoadingContainer>
              : (
                <ChartsContainer noPadding={dataShow.length === 0}>
                  {
                    dataShow.length === 0
                      ? (<ErrorContainer>
                          <h2>There is no data to be displayed.</h2>
                        </ErrorContainer>)
                      : (
                        <>
                          <Chart labels={currentLabels} dataValues={selectData('newCases')} title="New Cases" type={currentChartType} />
                          <Chart labels={currentLabels} dataValues={selectData('totalCases')} title="Total Cases" type={currentChartType} />
                          <Chart labels={currentLabels} dataValues={selectData('deaths')} title="Total Deaths" type={currentChartType} />
                          <Chart labels={currentLabels} dataValues={selectData('deathsPerDay')} title="Deaths/Day" type={currentChartType} />
                          <Chart labels={currentLabels} dataValues={selectData('recovered')} title="Recovered" type={currentChartType} />
                          <Chart labels={currentLabels} dataValues={selectData('recoveredPerDay')} title="Recovered/Day" type={currentChartType} />
                        </>
                      )
                  }
                </ChartsContainer>
              )
          }
        </MainContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
