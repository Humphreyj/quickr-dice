const server = require('./server');
const apiRoutes = require('./api/apiRoutes')


const PORT = process.env.PORT || 3030;
server.use('/api',apiRoutes);
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})