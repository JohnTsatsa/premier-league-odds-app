# premier-league-odds-app

### Preperation  
- drag and drop the folder in your visual studio code
- open a new terminal
- type in the terminal 'cd client'
- type "npm i" and wait for the installation of the packages
- type in the terminal "npm start"
- open your browser and type 'http://localhost:3000/'

## The code will not render the data!!!
- go to https://the-odds-api.com/ and get a free API key
- go in our project in client --> src --> App.js --> line 14  
  and fill the code with your key number

### Guidance 
When the page loads,gets the data for the the English Premier League  
for all the games and the prices from different bookers for all the outcomes.  
The first table shows the match (teams) with the highest prices 
for every outcome comparing among all the bookers  
By clicking on a specific match,displays all the bookers for that match  
and the prices that they give for each outcome with highlightes the highest values  
so it can be easy to track which web page you should visit.
#### App.js
It contains everything that you see on first page. 
Finding the highest prices,renders the results in a table
#### DetailsTable.js  
It's the table that renders when the user clicks on a match
Renders all the prices for all bookers,highlighting the high ones

