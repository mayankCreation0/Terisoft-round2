const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});
server.use('/api', router);

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
