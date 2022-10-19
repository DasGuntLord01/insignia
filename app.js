let http = require('http');
let fs = require('fs');

let server = http.createServer( (req,res) => {

    if (req.url === "/"){

        //res.write("Content Here!");
        fs.readFile('index.php', (error, data) => {

            if (error){

                res.writeHead(500);
                res.write(error);
                res.end();

            }
            else {

                res.writeHead(200, { "Content-Type":"text/html" });
                res.write(data);
                res.end();

            }

        });

        res.end();

    }
    else {

        res.write("<h2>404</h2>");
        res.end();

    }


});

server.listen(80);

console.log("Running on port 80");