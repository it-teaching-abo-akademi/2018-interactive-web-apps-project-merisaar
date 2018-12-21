import React from 'react'
import Stock from './stockData.js'
import '../App.css';
import PopUp from './Popup';
// import drawGraph from './graphDraw';


import Graph from './graphDraw';

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
      open:false,
      newStock: {name : '', uv : 0, quantity : 0, tv:0},
      chartData: [],
      stockData: [],
    };
    this.fetchCurrencyRate = this.fetchCurrencyRate.bind(this)
    this.changeName =this.changeName.bind(this)
    this.saveNameChange =this.saveNameChange.bind(this)
    this.cancelNameChange =this.cancelNameChange.bind(this)
    this.saveStock = this.saveStock.bind(this)
    this.newStock = this.newStock.bind(this)
    this.removeSelected = this.removeSelected.bind(this)
    this.setChecked = this.setChecked.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
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
  //Saves modified name
  saveNameChange(e){
    e.stopPropagation();
    if(this.state.newName.trim().length>1){
      this.setState({
        name: this.state.newName.trim()})
    } else {
      alert('Name too short')
    }
    let div = e.target.parentElement
    let text = div.nextSibling
    div.setAttribute("hidden", true)
    text.removeAttribute("hidden")
  }
  
  cancelNameChange(e){
    let div = e.target.parentElement
    let text = div.nextSibling
    div.setAttribute("hidden", true)
    text.removeAttribute("hidden")
  }

  //Toggles popup
  popUpModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //Restores new stock to state on change
  newStock(e) {
    e.stopPropagation();
    const n = e.target.id.split('-')[0]
    let cpy = {...this.state.newStock}
    cpy[n] = e.target.value
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
  //Fetches stock data for past 10 recorded dates
  async fetchStockData(name){
    return await fetch('https://www.alphavantage.co/query?function='+name+'&symbol=USDEUR&interval=weekly&time_period=10&series_type=open&apikey=XDNRE3YNSC6MJXBQ')
    .then(response => response.json())
    .then(data => {
      if(Object.keys(data)[0] === 'Note' || Object.keys(data)[0] === 'Error Message'){
        alert('Only 5 request are allowed in one minute (by API)')
      }else {
        console.log(data)
        let dataL = data['Technical Analysis: ' + name]
        let days = Object.keys(dataL).reverse()
        let values = []
        values = days.map(day => values.concat(dataL[day])[0])
        return [values, days]
      }
    })
  }
 
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
  //Opens modal and draws graph
  onOpenModal = (e) => {
    e.stopPropagation();
    this.setState({ open: true });
  };

  render() {
    const renObjData = this.state.stocks.map((data, index) =>
          <Stock stock ={data} key={index} setChecked={this.setChecked}/>
    );
    const openModal = (this.state.open === true) ?
      <Graph stocks={this.state.stocks} open={this.state.open}></Graph>
      : console.log('not open')
    

    return (
      <div className="card">
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      <button onClick={(e) => {this.props.closePortfolio(e, this.state.id)}} className = 'close' ></button>
      <div><div hidden><input onChange={this.changeName} id={this.props.name}></input><button onClick={this.saveNameChange}>Save</button><button onClick={this.cancelNameChange}>Cancel</button></div><p onClick={this.hideTextShowInput}>{this.state.name}</p></div>
       <div className="btngroup">
            <button onClick={(e) => {this.fetchCurrencyRate(e, 'USD', 'EUR')}} className="button" id="desktop" >
            Show in €
          </button>
            <button onClick={(e) => {this.fetchCurrencyRate(e, 'EUR', 'USD')}} className="button" id="mobile" >
            show in $
          </button>

      </div>
  
    <div className="table-wrapper">
        <table className="blueTable">
        <tbody>
          <tr><th>Name</th><th>Value</th><th>Quantity</th><th>Total</th><th>Select</th></tr>
          {renObjData}
          </tbody>

        </table>
        </div>
        <div className="btngroup">

        <button onClick={this.popUpModal} className="button" id="desktop" >
        Add in stock
        </button>

        <button onClick={this.onOpenModal} className="button" id="mobile" >
        Perf graph         
        </button>
        <button onClick={this.removeSelected} className="button" id="mobile" >
        Remove selected
        </button>
        </div>
        <PopUp show={this.state.isOpen}
                  onClose={this.popUpModal}>
                  <form onChange={this.newStock}>
                  Name: <input id={'name-'+this.state.id} type="text"></input>
                  Value: <input id={'uv-'+this.state.id} type="number"></input>
                  Quantity:<input id={'quantity-'+this.state.id} type="number"></input>
                  <button onClick={this.saveStock}type="button">Save</button>
                  </form>
                </PopUp>
                {openModal}
                </div>
            
              
            )
          }
        }