// Create web server
// $ node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Create server
var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var filename = path.join(__dirname, pathname);

    // Check if file exists
    fs.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found\n');
            response.end();
            return;
        }

        // Read file
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write(err + '\n');
                response.end();
                return;
            }

            // Write file
            response.writeHead(200);
            response.write(data);
            response.end();
        });
    });
});

// Listen on port 8000
server.listen(8000, function() {
    console.log('Server running at http://