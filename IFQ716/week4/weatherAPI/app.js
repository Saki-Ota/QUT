require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");

const WEATHERAPI_BASE = "http://api.weatherapi.com/v1";
const API_KEY = process.env.WEATHERAPI_KEY;

// キャッシュ用の変数（複数の場所に対応）
let cache = {}; // { [location]: { data: ..., timestamp: ... } }

async function weather(res, location = "Brisbane") {
  const now = new Date().getTime();

  // キャッシュチェック
  if (cache[location] && now - cache[location].timestamp < 30000) {
    console.log("🌤️ Returning cached weather data for:", location);
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(cache[location].data));
    return;
  }

  try {
    const weatherResponse = await fetch(
      `${WEATHERAPI_BASE}/current.json?key=${API_KEY}&q=${location}`
    );
    const weatherData = await weatherResponse.json();

    const responseData = {
      condition: weatherData.current.condition.text,
      temperature: weatherData.current.temp_c,
      icon: weatherData.current.condition.icon, // 例: "//cdn.weatherapi.com/..."
    };

    // キャッシュに保存
    cache[location] = {
      data: responseData,
      timestamp: now,
    };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(responseData));
  } catch (err) {
    res.writeHead(500);
    res.end("Error fetching weather data");
  }
}

function routing(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  if (url.pathname === "/" && method === "GET") {
    const filePath = path.join(__dirname, "client.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (url.pathname === "/weather" && method === "GET") {
    const location = url.searchParams.get("location") || "Brisbane";
    weather(res, location);
  } else {
    res.writeHead(404);
    res.end("No matching page");
  }
}

http.createServer(routing).listen(3002, () => {
  console.log("🌐 Server running at http://localhost:3002/");
}); 

// require("dotenv").config();
// const http = require("http");

// const WEATHERAPI_BASE = "http://api.weatherapi.com/v1";
// const API_KEY = process.env.WEATHERAPI_KEY;

// let cache = {}; // Cache to store the weather data

// async function weather(res, location = "Melbourne") {
//   const now = new Date().getTime();

//   // Check if the data is already cached and not expired
//   if (cache[location] && now - cache[location].timestamp < 30000) {
//     console.log("Returning cached weather data for location:", location);
//     res.writeHead(200, {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     });
//     res.end(JSON.stringify(cache[location].data));
//     return;
//   }

//   // If not cached or expired, fetch new data, also update the cache
//   try {
//     const weatherResponse = await fetch(
//       `${WEATHERAPI_BASE}/current.json?key=${API_KEY}&q=${location}`
//     );
//     const weatherData = await weatherResponse.json();

//     const responseData = {
//       condition: weatherData.current.condition.text,
//       temperature: weatherData.current.temp_c,
//       icon: weatherData.current.condition.icon,
//     };

//     // Update the cache with the new data
//     cache[location] = {
//       data: responseData,
//       timestamp: now,
//     };

//     res.writeHead(200, {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     });
//     res.end(JSON.stringify(responseData));
//   } catch (err) {
//     res.writeHead(500);
//     res.end("Error fetching weather data");
//   }
// };

// // Function to handle routing
// function routing(req, res) {
//   const url = new URL(req.url, `http://${req.headers.host}`);
//   const method = req.method;

//   if (url.pathname === "/" && method === "GET") {
//     const filePath = path.join(__dirname, "client.html");
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         res.end("Error loading HTML");
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//       }
//     });
//   } else if (url.pathname === "/weather" && method === "GET") {
//     const location = url.searchParams.get("location") || "Brisbane";
//     weather(res, location);
//   } else {
//     res.writeHead(404);
//     res.end("No matching page");
//   }
// }

// // Create an HTTP server
// http.createServer(routing).listen(3002, function () {
//   console.log("server start at port 3002"); //the server object listens on port
// });
