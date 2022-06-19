import * as fsp from "fs/promises";
import http from "http";
// import translations from "./translations.json";

function readMyFile(readMyFile) {
  fsp.readFile(`./${readMyFile}`, "utf-8")
  .then((data) => {
    fsp.readFile("./translations.json")
    .then ((array) => {
    const json = JSON.parse(array);
    const findItem = json.find((item) => item.en === data);
    if (findItem) {
      fsp.writeFile("./he.txt", findItem.he);
    }
  
  });
})
};


http.createServer((request, response) => {
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    readMyFile("en.txt");
    
   response.end('Hello World\n');
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');





// writeMyFile("./he.txt");
