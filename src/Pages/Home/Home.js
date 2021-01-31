import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts'

function Home() {
  const [fetchedData, setFetchedData] = useState()
  const [userData, setUserData] = useState({})
  const [generalState, setGeneralState] = useState({
      series: [],
      options: {
        chart: {
          id: 'fb',
          group: 'social',
          type: 'line',
          height: 160
        },
        colors: ['#008FFB'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },

      seriesLine2: [],
      optionsLine2: {
        chart: {
          id: 'tw',
          group: 'social',
          type: 'line',
          height: 160
        },
        colors: ['#546E7A'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },

      seriesArea: [],
      optionsArea: {
        chart: {
          id: 'yt',
          group: 'social',
          type: 'area',
          height: 160
        },
        colors: ['#00E396'],
        yaxis: {
          labels: {
            minWidth: 40
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },


    }
  )

  const chartWorker = new Worker('./workers/lineGraphWorker.js')

  useEffect(() => {
    chartWorker.onmessage = (event) => {
      setGeneralState(prevState => ({
              ...prevState, series: [...prevState.series, event.data.obj]
            }));
            setGeneralState(prevState => ({
              ...prevState, seriesLine2: [...prevState.seriesLine2, event.data.obj2]
            }))
            setGeneralState(prevState => ({
              ...prevState, seriesArea: [...prevState.seriesArea, event.data.obj3]
            }))
    }
  })

  const calculate = () => {
    chartWorker.postMessage(fetchedData)
  }

  useEffect(() => {
    fetch('http://ideadeploy.space/test/info.json',
      {
        method: "GET"
      }
    ).then(result => result.json())
      .then(data => setUserData(data))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    fetch('http://ideadeploy.space/test/graph.json')
      .then(res => res.json())
      .then(data => {
        setFetchedData(data)
      })
      .catch(error => console.log('Error', error))
  }, [])

  useEffect(() => {
    calculate()
  }, [fetchedData])

  return (
    <div className='container-fluid px-5'>
      <h3 className='mb-3'>Username: {userData.login}</h3>

      <div id="chart-line">
        <ReactApexChart options={generalState.options} series={generalState.series} type='line' height={160}/>
      </div>
      <div id="chart-line2">
        <ReactApexChart options={generalState.optionsLine2} series={generalState.seriesLine2} type="line" height={160}/>
      </div>
      <div id="chart-area">
        <ReactApexChart options={generalState.optionsArea} series={generalState.seriesArea} type="area" height={160}/>
      </div>

    </div>
  );
}

export default Home;