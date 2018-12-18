import React from 'react'
import {Stock} from './stockData.js'
import '../App.css';

export default class Portfolio extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.stocks,
      currency: 'EUR',
    };
    this.fetchCurrencyRate = this.fetchCurrencyRate.bind(this)
    console.log(this.state.stocks)
  }
  //Calculates the total
  calculate (value) {
    console.log(this.state.currencyRate*value)
    return this.state.currencyRate*value
  }
  //Fetches currency rate from API on click
  fetchCurrencyRate(e, cur1, cur2) {
    e.stopPropagation();
    fetch('https://free.currencyconverterapi.com/api/v6/convert?q=' + cur1 + '_' + cur2)
      .then(response => response.json())
      .then(data => {
        if(cur2 != this.state.currency){          
          var cr = data.results[cur1 + '_'+ cur2].val
          const stocksC =this.state.stocks.map(data => data = data);
          stocksC.forEach(function(st){
            st.uv = (st.uv*cr).toFixed(2)
          })
          this.setState({
            stocks: stocksC,
            currency: cur2,
          });
      }
      })
  }
  //Adds new empty stock
  addNewPortfolio (e) {
    e.stopPropagation();
  }
  render() {


    const renObjData = this.state.stocks.map(function(data, idx) {
      return (
          <Stock stock ={data} key={idx} />
        );
      });

    return (
      <div className="card item2">
      {this.props.name}
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
          <tr><th>Name</th><th>Value</th><th>Quantity</th><th>Total</th></tr>
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
// export const Portfolio = (props) => {
//   const renObjData = props.stocks.all.map(function(data, idx) {
//     return (
//         <Stock name={data.name} key={idx} />
//       );
//     });

//   const fetchCurrencyRate = (cur1, cur2) => {
//     fetch('https://free.currencyconverterapi.com/api/v6/convert?q='+ cur1 +'_' + cur2)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.results)
//       })
//   }

//   const fetchCurrencyRate = (cur1, cur2) => {
//     fetch('https://free.currencyconverterapi.com/api/v6/convert?q='+ cur1 +'_' + cur2)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.results)
//       })
//   }

//   return (
//       <div className="card">
//        <div className="btngroup">
//             <button onClick={fetchCurrencyRate('USD', 'EUR')} className="button" id="desktop" >
//             Show in €
//           </button>
//             <button onClick={fetchCurrencyRate('EUR', 'USD')} className="button" id="mobile" >
//             show in $
//           </button>

//     </div>
//     <div className="table-wrapper">
//         <table className="blueTable">
//         <tbody>
//           <tr><th>Name</th><th>Name</th><th>Name</th></tr>
//           {renObjData}
//           </tbody>

//         </table>
//         </div>
//         <div className="btngroup">

// <button className="button" id="desktop" >
// Add in stock
// </button>

// <button className="button" id="mobile" >
// Perf graph
// </button>
// <button className="button" id="mobile" >
// Remove selected
// </button>

// </div>
//         </div>
    
//   )
// }
