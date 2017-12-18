var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("-----------------------------------");
      
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
      // start(res);
      
    });   
    console.log("-----------------------------------");    
    start();
    
    connection.end();
    
  }

  function start() 
  {
    inquirer
      .prompt({
        name: "buy",
        type: "input",
        message: "What item would you like to buy? (Enter a Id from the 1st column)",
      })
      .then(function(answer) {

        console.log(answer.buy);

        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.buy}, function(err, res) {
          if (err) throw err;
    
          // If the user has selected an invalid item ID, data attay will be empty
          // console.log('data = ' + JSON.stringify(data));
    
          if (res.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');    
          } else {
            console.log ("You've purchased" + res.product_name);
          }

    
        
      });
  }

)}