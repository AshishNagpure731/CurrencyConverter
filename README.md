Just Pull The Project and run the command called npm install.
After that to run the project, Type Command called npm start
and select a (a --> android)

My Approach to do the task
first I go through the Documentation of ExchangeRate-API from there i found the public key 
then after i fetch the data from that api and store in useState hook and passes to each component with the help of contextApi hook
then i uses react native navigation to go one scrteen to another screen

mainly i created 3 components 
first is App.js where i am fetching the data of api and sending the data and navigate to the screen
second is DASHBOARD.JS where i am showing some popular currency with respect to INR
third is CurrencyConverter.js where one currency value to another currency value is showing
