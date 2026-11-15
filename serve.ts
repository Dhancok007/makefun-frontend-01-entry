import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('app');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url||'/', 'http://localhost').pathname);const path=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!path.startsWith(root+sep))throw Error('Outside root');const body=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT||8080),'127.0.0.1',()=>console.log('Serving app at http://127.0.0.1:'+ (process.env.PORT||8080)));
