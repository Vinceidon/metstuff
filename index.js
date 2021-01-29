Skip to content
Why GitHub? 
Team
Enterprise
Explore 
Marketplace
Pricing 
Search

Sign in
Sign up
petranb2
/
Node_Python
21117
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Node_Python/index.js /
@nfuad
nfuad validate json, minor changes
Latest commit c887221 on Jul 3, 2020
 History
 2 contributors
@petranb2@nfuad
29 lines (25 sloc)  835 Bytes
  
const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  const python = spawn('python', ['script3.py'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    //dataToSend =  data;
    largeDataSet.push(data)
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    // send data to browser
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
 