const http = require('http')
const fs = require('fs')
const path = require('path')
const db = require('./db')
const Image = db.image


http.createServer((req, res) => {

console.log(`req: ${req.url}`);
    if(req.url === '/'){
        sendRes('index.html', 'text/html', res)
    }
    else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST'){
        saveUploadFile(req,res)
    }
    else if (req.url === '/save-form'){
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log(body);
            writeToDb(body, res)
        })
    }
    else{
        sendRes(req.url,getContentType(req.url) ,res)
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

function getContentType(url){
    
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

function writeToDb(data,res){
    data = JSON.parse(data,true)
    Image.create({
        image_name: data['input-1'],
        file_name:data['input-2'],
        user_name:data['input-3']
    })
    .then(result =>{
        res.writeHead(200,{'Content-Type': contentType})
        res.write(result)
        res.end('ok')
    })
    .catch(err => res.end('err'))
}