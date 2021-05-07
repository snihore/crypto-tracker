import React, { Component } from 'react';
import totalDays from './total_days.js';
import getDate from './get_date.js';

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
      return <div style={{color:"#ffffff"}}>Loading ...</div>;
    }
    return (

      <div className="App" style={{backgroundColor:"#000000"}}>
        <ul style={{listStyleType:"none"}}>
          {
            api_data.map(data =>(
                <li key={data.buyAt}>
                  <strong style={{color:"#ffffff"}}>User Name: </strong><span style={{color:"#ffffff"}}>{data.userName}</span><br />
                  <strong style={{color:"#ffffff"}}>{new Date().toLocaleTimeString()}</strong><br />
                  <strong style={{color:'skyblue'}}>{totalDays(data.time, getDate())+" ago"}</strong><br /><br />
                  <strong style={{color:"#ffffff"}}>Coin Name: </strong><span style={{color:"#ffffff"}}>{data.name}</span><br />
                  <strong style={{color:"#ffffff"}}>Buy At: </strong><span style={{color:"#ffffff"}}>{data.buyAt} </span>
                  <strong style={{color:"#ffffff"}}>Total Buy At: </strong><span style={{color:"#ffffff"}}>{data.totalBuyAt} </span>
                  <strong style={{color:"#ffffff"}}>Quantity: </strong><span style={{color:"#ffffff"}}>{data.quantity}</span><br />
                  <strong style={{color:"#ffffff"}}>LTP: </strong><span style={{color:"#ffffff"}}>{data.last} </span>
                  <strong style={{color:"#ffffff"}}>Total Now: </strong><span style={{color:"#ffffff"}}>{data.totalNow} </span><br />
                  <strong style={{color:"#ffffff"}}>P&amp;L: </strong><strong style={{color: data.profit_and_loss >= 0 ? "#00ff00" : "#ff0000"}}>{data.profit_and_loss} </strong>
                  <strong style={{color:"#ffffff"}}>ROI: </strong><strong style={{color: data.profit_and_loss_per >= 0 ? "#00ff00" : "#ff0000"}}>{data.profit_and_loss_per}% </strong><br />
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


