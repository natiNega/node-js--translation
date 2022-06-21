import express from "express";
import * as fsp from "fs/promises";
import http from "http";
// import translations from "./translations.json";

// function readMyFile(readMyFile) {
//   //read the name form fild "en.txt" array and insert to data
//   fsp.readFile(`./${readMyFile}`, "utf-8").then((data) => {
//     fsp
//       .readFile("./translations.json")

//       //read all the array and insert to "array"
//       .then((array) => {
//         //converter the string array to json
//         const json = JSON.parse(array);

//         //we Compare between
//         const findItem = json.find((item) => item.en === data);
//         if (findItem) {
//           fsp.writeFile("./he.txt", findItem.he);
//         }
//       });
//   });
// }
//creat function express and return listen to 8000

const app = express();
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/products", (req, res) => {
  fsp.readFile(`./products.json`, "utf-8").then((data) => {
    const array = JSON.parse(data);
    res.send(array);
  });
});

app.get("/products/:id", (req, res) => {
  fsp.readFile(`./products.json`, "utf-8").then((data) => {
    const { id } = req.params;
    // console.log(req.params);
    const array = JSON.parse(data);
    const productItem = array.find((item) => item.id === +id);
    if (productItem !== undefined) {
      res.send(productItem);
    } else {
      res.send("Is Error");
    }
  });
});

function getMaxId(arr) {
  const ids = arr.map((item) => {
    return item.id;
  });
  const max = Math.max(...ids);
  return max;
}

app.use(express.json());
app.post("/products", (req, res) => {
  const { title, price, category } = req.body;

  fsp.readFile(`./products.json`, "utf8").then((data) => {
    const productArr = JSON.parse(data);
    productArr.push({
      id: getMaxId(productArr) + 1,
      title,
      price,
      category,
    });
    // console.log(productArr);
    fsp.writeFile("./products.json", JSON.stringify(productArr)).then((s) => {
      console.log(s);
      res.send("done");
    });
  });
});

app.listen(8000);

// //creat HTTP server and listen on port 8000 for reqests
// http
//   .createServer((request, response) => {
//     //
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     readMyFile("en.txt");

//     response.end("Hello World\n");
//   })
//   .listen(8000);

// //print URL for accessing
// console.log("Server running at http://127.0.0.1:8000/");

// writeMyFile("./he.txt");
