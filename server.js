import express from "express";
import * as fsp from "fs/promises";
// import http from "http";
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

const app = express();
// app.get("/", (req, res) => {
//   res.send("Home");
// });

app.use(express.json());

app.get("/products", (req, res) => {
  console.log("req.query", req.query);
  fsp.readFile("./products.json", "utf-8").then((data) => {
    const products = JSON.parse(data);
    if (req.query) {
      const { title } = req.query;
      const filtereProducts = products.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
      res.send(filtereProducts);
    }
    res.send(products);
  });
});
// creat function express and return listen to 8000
//.1

//.1
// bring all the data from the serves
// app.get("/products", (req, res) => {
//   fsp.readFile(`./products.json`, "utf-8").then((data) => {
//     const array = JSON.parse(data);
//     res.send(array);
//   });
// });

// app.get("/products/:id", (req, res) => {
//   fsp.readFile(`./products.json`, "utf-8").then((data) => {
//     const { id } = req.params;
//     // console.log(req.params);
//     const array = JSON.parse(data);
//     const productItem = array.find((item) => item.id === +id);
//     if (productItem !== undefined) {
//       res.send(productItem);
//     } else {
//       res.send("Is Error");
//     }
//   });
// });

// function getMaxId(arr) {
//   const ids = arr.map((item) => {
//     return item.id;
//   });
//   const max = Math.max(...ids);
//   return max;
// }

// app.post("/products", (req, res) => {
//   const { title, price, category } = req.body;

//   fsp.readFile(`./products.json`, "utf8").then((data) => {
//     const productArr = JSON.parse(data);
//     productArr.push({
//       id: getMaxId(productArr) + 1,
//       title,
//       price,
//       category,
//     });
//     // console.log(productArr);
//     fsp.writeFile("./products.json", JSON.stringify(productArr)).then((s) => {
//       console.log(s);
//       res.send(productArr);
//     });
//   });
// });

// app.patch("/products/:id", (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;

//   fsp.readFile("./products.json", "utf8").then((data) => {
//     if (title) {
//       const products = JSON.parse(data);
//       const productIndex = products.findIndex((product) => product.id === +id);
//       products[productIndex] = { ...products[productIndex], ...req.body };
//       fsp.writeFile("./products.json", JSON.stringify(products)).then(() => {
//         res.send(products);
//       });
//     }
//   });
// });

// app.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   fsp.readFile("./products.json", "utf8").then((data) => {
//     const products = JSON.parse(data);
//     const productIndex = products.findIndex((product) => product.id === +id);

//     if (productIndex >= 0) {
//       products.splice(productIndex, 1);
//       fsp.writeFile("./products.json", JSON.stringify(products)).then(() => {
//         res.send(products);
//       });
//     } else {
//       res.send(products);
//     }
//   });
// });

app.listen(8000);

//creat HTTP server and listen on port 8000 for reqests
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
