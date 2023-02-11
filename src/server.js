import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks') {
    return res.end('Listagem de usuários');
  }  

  res.writeHead(404).end('Route not found!');
});

server.listen(3333, () => {
  console.log('Running at port 3333');
});
