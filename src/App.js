import React, { Component } from 'react';

// const URL = `https://vast-fjord-21675.herokuapp.com/`;

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      api_data: [],
      isLoaded: false
    }
  }


  
  componentDidMount(){

    try{

      fetch('/api_data')
      .then(data=>data.json())
      .then(json => {
        // console.log(json);
        this.setState({
          isLoaded: true,
          api_data: json
        });
      });

    }catch(err){

    }

  }

  render(){

    var { isLoaded, api_data } = this.state;

    if(!isLoaded){
      return <div>Loading ...</div>;
    }
    return (

      <div className="App">
        <ul style={{listStyleType:"none"}}>
          {
            api_data.map(data =>(
                <li key={data.buyAt}>
                  <strong>User Name: </strong><span>{data.userName}</span><br />
                  <strong>{data.time}</strong><br /><br />
                  <strong>Coin Name: </strong><span>{data.name}</span><br />
                  <strong>Buy At: </strong><span>{data.buyAt} </span>
                  <strong>Total Buy At: </strong><span>{data.totalBuyAt} </span>
                  <strong>Quantity: </strong><span>{data.quantity}</span><br />
                  <strong>LTP: </strong><span>{data.last} </span>
                  <strong>Total Now: </strong><span>{data.totalNow} </span><br />
                  <strong>P&amp;L: </strong><span>{data.profit_and_loss} </span>
                  <strong>ROI: </strong><span>{data.profit_and_loss_per}% </span><br />
                  <hr />
                </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;


