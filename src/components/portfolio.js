import React from 'react'
import Stock from './stockData.js'
import '../App.css';
import Modal from './Modal';
import Chart from "react-google-charts";

export default class Portfolio extends React.Component{
  constructor(props) {
    super(props);
    let copyTest = [...props.stocks]
    copyTest = copyTest.forEach(function(st){ 
      st.tv = st.uv*st.quantity
    })
    this.state = {
      stocks: this.props.stocks,
      currency: 'EUR',
      newName: '',
      name: this.props.name,
      id: this.props.id,
      isOpen: false,
      newStock: {name : '', uv : 0, quantity : 0, tv:0},
      chartData: [],
      stockData: [],
    };
    this.fetchCurrencyRate = this.fetchCurrencyRate.bind(this)
    this.changeName =this.changeName.bind(this)
    this.save =this.save.bind(this)
    this.saveStock = this.saveStock.bind(this)
    this.newStock = this.newStock.bind(this)
    this.removeSelected = this.removeSelected.bind(this)
    this.setChecked = this.setChecked.bind(this)
    this.drawCurveTypes = this.drawCurveTypes.bind(this)
  }

  //Fetches currency rate from API on click
  fetchCurrencyRate(e, cur1, cur2) {
    e.stopPropagation();
    fetch('https://free.currencyconverterapi.com/api/v6/convert?q=' + cur1 + '_' + cur2)
      .then(response => response.json())
      .then(data => {
        if(cur2 !== this.state.currency){          
          var cr = data.results[cur1 + '_'+ cur2].val
          const stocksC =[...this.state.stocks]
          stocksC.forEach(function(st){
            st.uv = (st.uv*cr).toFixed(2)
            st.tv = (st.uv*st.quantity).toFixed(2)
          })
          this.setState({
            stocks: stocksC,
            currency: cur2,
          });
      }
      })
  }
  //Adds new empty stock
  addNewStock (e) {
    e.stopPropagation();
  }
  //Toggles input and text
  hideTextShowInput(e){
    e.stopPropagation();
    let el = e.target
    let input = el.parentElement.firstChild
    // let saveButton = el.parentElement.childNodes[1]
    console.log(el.parentElement)
    if(el.hasAttribute("hidden")){
       el.removeAttribute("hidden")
    }else{ 
      el.setAttribute("hidden", true)}
      input.removeAttribute("hidden")
  }
  //Store name while typing
  changeName(e){
    e.stopPropagation();
    console.log(e.target.value)
    this.setState({
      newName:e.target.value,
    })
  }
  //Change name by clicking save button
  save(e){
    e.stopPropagation();
    if(this.state.newName.trim().length>1){
      this.setState({
        name: this.state.newName.trim()})
    } else {
      alert('Name too short')
    }
    let div = e.target.parentElement
    let text = div.nextSibling
    console.log(text)
    div.setAttribute("hidden", true)
    text.removeAttribute("hidden")
  }
  //Closes and deletes portfolio
  closePortfolio(e){
    e.stopPropagation();

  }
  //Toggles modal
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //Restores new stock to state on change
  newStock(e) {
    e.stopPropagation();
    console.log(e.target)
    console.log(e.target.value)
    const n = e.target.id.split('-')[0]
    let cpy = {...this.state.newStock}
    cpy[n] = e.target.value
    console.log(cpy)
    this.setState({
      newStock: cpy,
    });
  }
  //Saves stock when clicking 'save'
  saveStock = () => {
    if(this.state.newStock.name.length>1 && this.state.newStock.uv > 0 && this.state.newStock.quantity > 0){
      let newstock =  {...this.state.newStock}
      newstock.tv = newstock.uv*newstock.quantity
      let len = this.state.stocks.length + 1
      newstock.id = 'stock' + this.state.id + len 
      console.log(newstock.id)
      var newStocksList = this.state.stocks.concat(newstock)
      this.setState({
        stocks: newStocksList,
        isOpen: !this.state.isOpen
      });
    } else {
      alert('Invalid input')
    }
  }
  //Removes selected columns and stocks
  removeSelected (e) {
    let stocksCopy = [...this.state.stocks]
    console.log(stocksCopy)
    let selected = stocksCopy.filter(stock => stock.checked === false)
    console.log(selected)
    this.setState({stocks: selected});
  }
  //Sets checked to true in state stock when clicking the checkbox
  setChecked (e, id) {
    e.stopPropagation()
    let stocksCpy = Object.assign([], this.state.stocks);
    let stock = stocksCpy.filter(s=> s.id === id)[0]
    stock.checked ? stock.checked = false : stock.checked = true
    this.setState({stocks: stocksCpy});

  }
  async fetchStockData(name){
    return await fetch('https://www.alphavantage.co/query?function='+name+'&symbol=USDEUR&interval=weekly&time_period=10&series_type=open&apikey=XDNRE3YNSC6MJXBQ')
    // return await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo')    
    .then(response => response.json())
    .then(data => {
      let dataL = data['Technical Analysis: ' + name]
      let days = Object.keys(dataL)
      days = days.slice(0,10)
      let test = []
      test = days.map(day => test.concat(dataL[day])[0])
      // let sD = Object.assign([], this.state.stockData)
      // sD = sD.concat(test)
      // console.log(sD)
      // this.setState({stockData: sD})
      return [test, days]
      // console.log(data['Time Series (Daily)'])
      // return data['Time Series (Daily)']
    })
  }
  async drawCurveTypes() {
    let stocks = this.state.stocks
    // let data = Object.assign([], this.state.chartData)
    let list = ['Time']
    let nameList = stocks.map(l => l.name)
    list = list.concat(nameList)
    // data = data.concat(list)
    let sD = []
    let realList = []
    realList.push(list)
    await Promise.all(nameList.map(async (name) => 
      this.fetchStockData(name))).then(function(result) {
        // console.log('result ', result)
        sD = result
      })
    console.log('sD length: ', sD.length)
    for(var i = 0; i<sD[0][0].length; i++){
      
      let dataPoints = []
      dataPoints = [sD[0][1][0]]
      for(var j = 0; j<sD.length; j++){
        console.log('TEST', sD[j][0][i])
        dataPoints = dataPoints.concat(parseFloat(Object.values(sD[j][0][i])[0]))
        console.log('dataPoints ', dataPoints)
      }
      realList.push(dataPoints)
      console.log('reallist ', realList)
      
    }
    console.log(realList)
    this.setState({
      stockData: realList,
    });
  }

  render() {
    const data = [
      ["Year", "Sales", "Expenses"],
      ["2004", 1000, 400],
      ["2005", 1170, 460],
      ["2006", 660, 1120],
      ["2007", 1030, 540]
    ];
    const options = {
      title: "Stock value",
      curveType: "function",
      legend: { position: "bottom" }
    };
    const renObjData = this.state.stocks.map((data, index) =>
          <Stock stock ={data} key={index} setChecked={this.setChecked}/>
    );

    return (
      <div className="card">
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      <button onClick ={this.closePortfolio} className = 'close' ></button>
      <div><div hidden><input onChange={this.changeName} id={this.props.name}></input><button onClick={this.save}>Save</button></div><p onClick={this.hideTextShowInput}>{this.state.name}</p></div>
       <div className="btngroup">
            <button onClick={(e) => {this.fetchCurrencyRate(e, 'USD', 'EUR')}} className="button" id="desktop" >
            Show in €
          </button>
            <button onClick={(e) => {this.fetchCurrencyRate(e, 'EUR', 'USD')}} className="button" id="mobile" >
            show in $
          </button>

    </div>
    <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={this.state.stockData}
          options={options}
        />
    <div className="table-wrapper">
        <table className="blueTable">
        <tbody>
          <tr><th>Name</th><th>Value</th><th>Quantity</th><th>Total</th><th>Select</th></tr>
          {renObjData}
          </tbody>

        </table>
        </div>
        <div className="btngroup">

<button onClick={this.toggleModal} className="button" id="desktop" >
Add in stock
</button>

<button onClick={this.drawCurveTypes} className="button" id="mobile" >
Perf graph
</button>
<button onClick={this.removeSelected} className="button" id="mobile" >
Remove selected
</button>

</div>
<Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          <form onChange={this.newStock}>
          Name: <input id={'name-'+this.state.id} type="text"></input>
          Value: <input id={'uv-'+this.state.id} type="number"></input>
          Quantity:<input id={'quantity-'+this.state.id} type="number"></input>
          <button onClick={this.saveStock}type="button">Save</button>
          </form>
        </Modal>
<Modal show={this.state.modalIsOpen}
          onClose={this.toggleModal}>
          <div id="chart_div"></div>
        </Modal>
        </div>
     
      
    )
  }
}