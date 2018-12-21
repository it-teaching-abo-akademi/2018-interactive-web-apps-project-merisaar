import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import Portfolio from './components/portfolio.js'

class App extends React.Component {
  constructor() {
    super();
    let pf = localStorage.getItem('portfolio')
    if(pf !== null){
      // pf = JSON.parse(pf)
      pf=[]
    } else {
      pf = []
    }
    this.state = {
      portfolio: pf,
      }
      this.addNewPortfolio = this.addNewPortfolio.bind(this);
      this.closePortfolio = this.closePortfolio.bind(this)
      this.updatePortfolioState = this.updatePortfolioState.bind(this)
    }

    //Set result to state and localStorage
    onSetResult = (result, key) => {
      localStorage.setItem(key, JSON.stringify(result));
      this.setState({ portfolio: result });
    }
    //Updates portfolio when stock updates
    updatePortfolioState(portfolioId, stocks, name){
      let pfCopy =  Object.assign([],  this.state.portfolio);
      for(var i = 0; i<pfCopy.length; i++){
        if(pfCopy[i].id === portfolioId){
          pfCopy[i].name = name
          pfCopy[i].stocks = stocks
        }
      }
      this.setState({portfolio: pfCopy})
      this.onSetResult(pfCopy, 'portfolio')
    }
    //Counts max id
    setId(){
      let pC = [...this.state.portfolio]
      let list =[];
      list = list.concat(0)
      let idList = pC.map(p => p.id)
      idList.map(id => list = list.concat(id))
      let max = (Math.max(...list)) + 1
      return max
    }
    //Adds new empty portfolio
    addNewPortfolio (e) {
      e.stopPropagation();
      let len = this.state.portfolio.length +1
      let id = this.setId()
      if(len<=10){
      let newPortfolio = { name: 'Portfolio ' + len, id: id, stocks: []}
      this.setState({
        portfolio: this.state.portfolio.concat([newPortfolio])
      });
      this.onSetResult(this.state.portfolio.concat([newPortfolio]), 'portfolio')
    } else { 
      alert('Too many portfolios. Max amount of portfolios is 10.')
    }
    }
    //Closes and deletes portfolio
    closePortfolio(e, id){
      e.stopPropagation();
      console.log(id)
      let portfolios = [...this.state.portfolio]
      let selected = portfolios.filter(portfolio => portfolio.id !==  id)
      this.setState({portfolio: selected});
      this.onSetResult(selected, 'portfolio')
  }

    render(){
      //Adds portfolios from state to the page
      const renObjData = this.state.portfolio.map( (data,index) =>
            <Portfolio name={data.name} totalValue={0} updatePortfolioState={this.updatePortfolioState} stocks={data.stocks} closePortfolio={this.closePortfolio} key = {index} id={data.id} />
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
