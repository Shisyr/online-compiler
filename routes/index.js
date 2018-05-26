const express = require('express')
const app = express.Router()
var exec = require('child_process').exec;
var fs = require('fs');

app.get('/', (req, res) =>{
  res.render('index');
});

app.post('/', (req, res) =>{
  var isHasInput = false;
  var isFinished = false;
  fs.appendFile('cpp/main.cpp', req.body.code, (err) =>{
    if(err) throw err;
    console.log("Successfully written!");
  });
  if(req.body.input !== "")
  {
    isHasInput = true;
    fs.appendFile('cpp/main.txt', req.body.input, (err) =>{
      if(err) throw err;
      console.log("Successfully written input!");
    });
  }
    var code = "g++ -std=c++11 cpp/main.cpp -o cpp/main";
    exec(code, (err, stdout, stderr)=>{
        var output = "cpp/main";
        if(isHasInput)
        {
          output += " < cpp/main.txt";
        }
        exec(output, (err, stdout, stderr)=>{
          console.log(stdout);
          isFinished = true;
          if(isFinished)
          {
            fs.unlink('cpp/main.cpp', (err)=>{
              if(err) throw err;
              console.log("main.cpp deleted!");
            });
            fs.unlink('cpp/main.txt', (err) =>{
              if(err) throw err;
              console.log("main.txt deleted!");
            });
            fs.unlink('cpp/main', (err) =>{
              if(err) throw err;
              console.log("main deleted!");
            });
          }

        });
    });
    res.render('index');
});







module.exports = app
