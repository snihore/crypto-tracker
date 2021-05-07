const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const {inputData} = require('./input');

const API = `https://api.wazirx.com/api/v2/tickers`;

let settings = { method: "Get" };

const app = express();

const publicPath = path.join(__dirname, '..', 'build');

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//    res.sendFile(path.join(publicPath, 'index.html'));
// });
// app.listen(port, () => {
//    console.log('Server is up!');
// });


function getInfo(data, buyAt, quantity, userName, date){

    const time = date;
    
    var name = data.name;
    var last = Number(data.last);

    var totalBuyAt = quantity * buyAt;
    var totalNow = quantity * last;

    var difference = last - buyAt;
    var profit_and_loss = totalNow - totalBuyAt;

    var profit_and_loss_per = (difference/buyAt)*100;

    var obj = {
        userName,
        time,
        name,
        buyAt,
        totalBuyAt: totalBuyAt.toFixed(2),
        quantity,
        last,
        totalNow: totalNow.toFixed(2),
        profit_and_loss: profit_and_loss.toFixed(2),
        profit_and_loss_per: profit_and_loss_per.toFixed(2)
      };
    
      return obj;
}


const getWazirxApiData = (res) => {

     //Fetch Data ...
     fetch(API, settings)
     .then(res => res.json())
     .then((data) => {

         //Get Data
         var dataKeys = Object.keys(data);
         var keys = [];
         var types = new Set();
         var smallTypes = new Set();

         for(var i=0; i<inputData.length; i++){
             var type = inputData[i].type;
             var smallType = inputData[i].smallType;

             types.add(type);
             smallTypes.add(smallType);
         }

         for(var i=0; i<dataKeys.length; i++){

            smallTypes.forEach(smallType => {
                if(dataKeys[i].toLowerCase().includes(smallType)){ //inr
                    keys.push(dataKeys[i]);
                }
            });

         }

         var finalData = [];

         for(var i=0; i<keys.length; i++){

             var element = data[keys[i]];

             if(element.last !== '0.0'){
                 var obj = {
                     name: element.name,
                     open: element.open,
                     last: element.last
                 }
         
                 finalData.push(obj);
             }
         }

         var arr = [];



         for(var j=0; j<inputData.length; j++){

            var type = inputData[j].type;

            for(var i=0; i<finalData.length; i++){

                types.forEach(t => {

                    if(finalData[i].name.includes(t) && finalData[i].name.includes(type)){

                        arr.push(getInfo(finalData[i], inputData[j].buyAt, inputData[j].quantity, inputData[j].name, inputData[j].date));
    
                    }
                    
                });
            }
         }
         
         res.send(arr); 

     });
}

app.get('/api_data', (req, res) => {

    try{
        getWazirxApiData(res);
        
    }catch(err){
        res.send({ error: err.message });
    }
    
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server is listen on port ${PORT}`);
});