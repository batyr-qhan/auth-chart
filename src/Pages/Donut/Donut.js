import React, {useState, useEffect} from 'react';
// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import './donut.css'

function Donut(props) {
  const [fetchedData, setFetchedData] = useState()

  const [graphData, setGraphData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  })

  useEffect(() => {
    fetch('http://ideadeploy.space/test/donut.json')
      .then(res => res.json())
      .then(data => {
        setFetchedData(data)
      })
      .catch(error => console.log('Error', error))
  }, [])

  useEffect(() => {
    if (fetchedData) {
      let arrOfViews = []
      let labels = []
      fetchedData.list.forEach(item => {
        arrOfViews.push(+item.views)
        labels.push(item.title)
      })

      setGraphData(prevState => ({
        ...prevState, series: arrOfViews
      }))

      setGraphData(prevState => ({
        ...prevState, options: {...prevState.options, labels: labels}
      }))

    }

  }, [fetchedData])

  return (
    <div className='container-fluid'>
      <h3 className='text-center mb-5'>Donut graph</h3>
      <div id="chart">
        <ReactApexChart series={graphData.series} options={graphData.options} type="donut"/>
      </div>

    </div>
  );
}

export default Donut;