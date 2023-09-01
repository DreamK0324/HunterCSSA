# HunterCSSA
 
 
 
## Client

## Common script to start the application or server:
```
npm start
```

## Server

## Dependencies

- **cors**: Enables Cross-Origin Resource Sharing (CORS) for handling cross-domain data sharing.
- **express**: A popular web application framework for Node.js, simplifying route creation and request handling.
- **express-async-handler**: A utility module that simplifies error handling for asynchronous request handlers in Express.
- **mongoose**: An Object Data Modeling (ODM) library for Node.js, designed to work with MongoDB, a NoSQL database. 

##### DevDependencies

- **nodemon**: A development tool that automatically restarts the server when source code changes, improving the development workflow.




## Common script to enable automatic server restarts whenever there are changes in the code:
```
npm run dev
```

## Common script to start the application or server:
```
npm start
```


## /utils/configDB.js:
```
const url = "your MongoDB Url";

module.exports = {
    url,
}

