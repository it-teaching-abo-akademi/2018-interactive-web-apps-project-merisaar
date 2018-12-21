import React from 'react'
import Chart from "react-google-charts";
import Modal from 'react-responsive-modal';
import styles from '../custom-styling.css';

export default class Graph extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.stocks,
      chartData: [],
      stockData: [],
      open: this.props.open,
    };
    this.drawStockValueCurves = this.drawStockValueCurves.bind(this)
    // this.onOpenModal = this.onOpenModal.bind(this)
    this.drawStockValueCurves()
  }

  //Closes modal
  closeModal = () => {
    this.setState({ open: false });
    this.props.onCloseModal()
  };
  //Fetches stock data for past 10 recorded dates
  async fetchStockData(name){
    // return await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo')
    return await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + name + '&apikey=XDNRE3YNSC6MJXBQ')
    .then(response => response.json())
    .then(data => {
      if(Object.keys(data)[0] === 'Note' || Object.keys(data)[0] === 'Error Message'){
        alert('Only 5 request are allowed in one minute (by API)')
      }else {
        // console.log(data)
        let dataL = data['Time Series (Daily)']
        // console.log('dataL ',dataL)
        let days = Object.keys(dataL).reverse()
        // console.log('days ', days)
        let values = []
        values = days.map(day => values.concat(dataL[day])[0])
        // console.log('values ',values)
        return [values, days]
      }
    })
  }
  // //Fetches stock data for past 10 recorded dates
  // async fetchStockData(name){
  //   return await fetch('https://www.alphavantage.co/query?function='+name+'&symbol=USDEUR&interval=weekly&time_period=10&series_type=open&apikey=XDNRE3YNSC6MJXBQ')
  //   .then(response => response.json())
  //   .then(data => {
  //     if(Object.keys(data)[0] === 'Note' || Object.keys(data)[0] === 'Error Message'){
  //       alert('Only 5 request are allowed in one minute (by API)')
  //     }else {
  //       console.log(data)
  //       let dataL = data['Technical Analysis: ' + name]
  //       let days = Object.keys(dataL).reverse()
  //       let values = []
  //       values = days.map(day => values.concat(dataL[day])[0])
  //       return [values, days]
  //     }
  //   })
  // }
  addListToSelectTag(list, selectIdList) {
    for(var j = 0; j<selectIdList.length; j++){  
      let select = document.getElementById(selectIdList[j])
      for(var i = 0; i<list.length; i++){
        var option = document.createElement("option")
        option.text = list[i]
        select.add(option)
        }
      }
  }
 //Draws curve
 async drawStockValueCurves() {
  let stocks = this.state.stocks
  let nameList = stocks.map(l => l.name)
  let sD = []
  await Promise.all(nameList.map(async (name) => 
    this.fetchStockData(name))).then(result => {
      sD = [...result];
      this.setState({stockData: Object.assign([], result)});
      console.log('sD: ',sD)
    })
  let time1 = sD[0][1][sD[0][1].length-11]
  let time2 = sD[0][1][sD[0][1].length-1]
  this.addListToSelectTag(sD[0][1], ['time1', 'time2'])
  this.drawGraph(time1, time2)
}

drawGraph(time1, time2){
  // e.stopPropagation()
  let sD = Object.assign([], this.state.stockData)
  let idx1 = sD[0][1].indexOf(time1)
  let idx2 = sD[0][1].indexOf(time2)
  if(!(idx1 <= idx2)){
    alert('Time invalid')
  } else {
    let stocks = [...this.state.stocks]
    let list = ['Time']
    let namelist = stocks.map(l => l.name)
    list =list.concat(namelist)
    let isUndefined = false
    let realList = []
    realList.push(list)
    try{
      for(var i = idx1; i<idx2+1; i++){
        let dataPoints = []
        dataPoints = [sD[0][1][i]]
        for(var j = 0; j<sD.length; j++){
          dataPoints = dataPoints.concat(parseFloat(Object.values(sD[j][0][i])[0]))
        }
        if(!Array.isArray(dataPoints)){
          // console.log(dataPoints)
          isUndefined = true
          break;
        }
        realList.push(dataPoints)
      }
    }catch{
      console.log('error') 
    }
    if(isUndefined === false){
      this.setState({
        chartData: realList,
      });
    } else {
      alert('Only 5 request are allowed in one minute (by API)')
    }
    }
}

render() {
  const options = {
    title: "Stock value",
    curveType: "function",
    legend: { position: "bottom" }
  };
  return(
    <Modal 
        open={this.state.open} 
        onClose={this.closeModal} 
        center
        classNames={{
          overlay: styles.customOverlay,
          modal: styles.customModal,
        }}
        >

    <div>
    <h2>Graph</h2>
    Select by time
    <select id='time1'><option>Select starting time</option></select>
    <select id='time2'><option>Select ending time</option></select>        
    <button onClick={(e) => {this.drawGraph(document.getElementById('time1').value, document.getElementById('time2').value)}}>Search</button>
    <Chart
      chartType="LineChart"
      width="700px"
      height="400px"
      data={this.state.chartData}
      options={options}
    />
    </div>

        </Modal>
  )
}
}