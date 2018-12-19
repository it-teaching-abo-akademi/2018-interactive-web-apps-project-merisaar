import React from 'react'
import {Stock} from './stockData.js'
import '../App.css';

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
    };
    this.fetchCurrencyRate = this.fetchCurrencyRate.bind(this)
    this.changeName =this.changeName.bind(this)
    this.save =this.save.bind(this)
    this.countTotal = this.save.bind(this)

  }

  //Fetches currency rate from API on click
  fetchCurrencyRate(e, cur1, cur2) {
    e.stopPropagation();
    fetch('https://free.currencyconverterapi.com/api/v6/convert?q=' + cur1 + '_' + cur2)
      .then(response => response.json())
      .then(data => {
        if(cur2 !== this.state.currency){          
          var cr = data.results[cur1 + '_'+ cur2].val
          const stocksC =this.state.stocks.map(data => data);
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
  closePortfolio(e){
    e.stopPropagation();

  }

  render() {
    const renObjData = this.state.stocks.map((data, index) =>
          <Stock stock ={data} key={index} />
        );

    return (
      <div className="card">
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
    <div className="table-wrapper">
        <table className="blueTable">
        <tbody>
          <tr><th>Name</th><th>Value</th><th>Quantity</th><th>Total</th><th>Select</th></tr>
          {renObjData}
          </tbody>

        </table>
        </div>
        <div className="btngroup">

<button className="button" id="desktop" >
Add in stock
</button>

<button className="button" id="mobile" >
Perf graph
</button>
<button className="button" id="mobile" >
Remove selected
</button>

</div>
        </div>
    )
  }
}