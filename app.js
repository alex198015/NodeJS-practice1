const http = require('http')
const fs = require('fs')
const path = require('path')


const httpServer = http.createServer((req, res) => {

console.log(`req: ${req.url}`);
    if(req.url === '/'){
        sendRes('index.html', 'text/html', res)
    }
    else{
        sendRes(req.url,grtConyenyType(req.url) ,res)
    }

}).listen(3000, () => {
    console.log('Server is working...');
    
})

function sendRes(url, contentType,res){
    let file = path.join(__dirname, url)
    fs.readFile(file, (err, content) => {
        if(err){
            res.writeHead(404)
            res.write('file not found')
            res.end()
            console.log(`error 404 ${file}`);
            
        }else{
            res.writeHead(200,{'Content-Type': contentType})
            res.write(content)
            res.end()
            console.log(`res 200 ${file}`);

        }
    })
}

function grtConyenyType(url){
    
    switch (path.extname(url)){
        case '.js':
            return 'text/javascript'
        case '.css':
            return 'text/css'
        case '.json':
            return 'application/json'
        case '.html':
            return 'text/html'
        default:
            return 'application/octet-stream'
    }
}