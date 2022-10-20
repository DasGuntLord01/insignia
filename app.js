#!/usr/bin/env node

/*
Just a simple backend node server
To handle serving the index and handle the save request
 */

let http = require('http');
let fs = require('fs');

let server = http.createServer( (req,res) => {

    if (req.url === "/"){

        //Serve index if someone comes to the website root

        fs.readFile('index.html', (error, data) => {

            if (error){
                console.log(error);
                res.writeHead(500);
                res.end();

            }
            else {

                res.writeHead(200, { "Content-Type":"text/html" });
                res.write(data);
                res.end();

            }

        });

    }
    else if (req.url === "/save") {

        //Handle the request to save a family.
        //This is mostly currently a placeholder
        if (req.method === "POST"){


            let body = "";

            req.on("data", (chunk) => {
                //Get chunks and append them to the body as they come in
                body += chunk;

            });

            req.on("end", () => {

                let parsed = JSON.parse(body);
                console.log(parsed); //just proving that I'm getting a family
                res.writeHead(200, { "Content-Type":"text/html" });
                res.write("<html>Family Successfully Saved</html>");
                res.end();

                //TODO: Save to the database of your choice


            });


        }
        else {
            //Bad Request if save is not post request
            res.writeHead(400);
            res.write("<h2>404</h2>");
            res.end();
        }


    }
    else {
        //Mandatory 404
        res.writeHead(404);
        res.write("<h2>404</h2>");
        res.end();

    }


});

server.listen(80);  //Listening on super-safe port 80!

console.log("Running on port 80");