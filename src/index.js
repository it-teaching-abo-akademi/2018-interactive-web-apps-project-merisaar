import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import Portfolio from './components/portfolio.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      portfolio: [
          {
            name: 'Portfolio 1',
            id: 1,
            stocks: [
              {
                id: 'stock11',
                name: 'ADX',
                uv: 4.3,
                quantity:10,
                tv: 0,
                checked: false,
              },
              {
                id: 'stock12',
                name: 'SMA',
                uv: 2.64,
                quantity:4,
                tv: 0,
                checked: false,
              },
              {
                id: 'stock13',
                name: 'EMA',
                uv: 40.32,
                quantity:1,
                tv: 0,
                checked: false,
              }
            ]
          },
          {
            name: 'Portfolio 2',
            id: 2,
            stocks: [
              {
                id: 'stock21',
                name: 'DEMA',
                uv: 4.3,
                quantity:10,
                tv: 0,
                checked: false,
              },
              {
                id: 'stock22',
                name: 'MOM',
                uv: 2.64,
                quantity:4,
                tv: 0,
                checked: false,
              },
              {
                id: 'stock23',
                name: 'PPO',
                uv: 40.32,
                quantity:1,
                tv: 0,
                checked: false,
              }
            ]
          }
        ]
      }
      this.addNewPortfolio = this.addNewPortfolio.bind(this);
      this.closePortfolio = this.closePortfolio.bind(this)
    }
    //Adds new empty portfolio
    addNewPortfolio (e) {
      e.stopPropagation();
      let len = this.state.portfolio.length +1
      if(len<=10){
      let newPortfolio = { name: 'Portfolio ' + len, id: len, stocks: []}
      this.setState({
        portfolio: this.state.portfolio.concat([newPortfolio])
      });
    } else { 
      alert('Too many portfolios. Max amount of portfolios is 10.')
    }
    }
    //Closes and deletes portfolio
    closePortfolio(e, id){
      e.stopPropagation();
      let portfolios = [...this.state.portfolio]
      let selected = portfolios.filter(portfolio => portfolio.id !==  id)
      this.setState({portfolio: selected});
  }

    render(){
      //Adds portfolios from state to the page
      const renObjData = this.state.portfolio.map( data =>
            <Portfolio name={data.name} stocks={data.stocks} closePortfolio={this.closePortfolio} key = {data.id} id={data.id} />
        );
    return (
      <div className="App">
        <header >

        </header>
        <body>
        <div className="addPortfolio"> <button onClick={this.addNewPortfolio}>Add portfolio</button></div>
        <div className="row">
          {renObjData}

          </div>
        </body>
        
      </div>

  )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
