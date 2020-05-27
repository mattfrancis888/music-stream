//note for me! refer to: https://spin.atomicobject.com/2018/10/08/mock-api-json-server/
const jsonServer = require("json-server");

var path = require("path");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

const router = jsonServer.router(path.join(__dirname, "db.json"));
const db = router.db.getState();

const server = jsonServer.create();
server.use(middlewares);
server.use(jsonServer.bodyParser); //needed for other methods besides GET

server.get("/streams", (req, res) => {
    res.status(200).jsonp(db);
});
server.get("/streams/:id", (req, res) => {
    let result = db.streams.find((stream) => {
        return stream.id == req.params.id;
    });
    res.status(200).jsonp(result);
});

server.post("/streams", (req, res) => {
    if (req.method === "POST") {
        //Set auto increment ID
        const lastItem = db.streams[db.streams.length - 1];
        const incrementId = lastItem.id + 1;

        req.body.id = incrementId;

        db.streams.push(req.body);
        //Must write to db in order to update db.json for local db.json
        //other wise it's stored in a cache database. Will be on database
        //for a while before it's deleted.
        //  router.db.write();
    }
    res.status(200).jsonp(req.body);
});

server.patch("/streams/:id", (req, res) => {
    //param.id is a string
    if (req.method === "PATCH") {
        db.streams = db.streams.map((stream) => {
            if (stream.id == req.params.id) {
                req.body.userId = stream.userId;
                req.body.id = stream.id;
                //req.body dosen't have the above properies, we still want them
                //in our object
                return req.body;
            } else {
                return stream;
            }
        });
        //  router.db.write();
    }
    res.status(200).jsonp(req.body);
});

server.delete("/streams/:id", (req, res) => {
    //param.id is a string
    if (req.method === "DELETE") {
        db.streams = db.streams.filter((stream) => stream.id != req.params.id);
    }
    //  router.db.write();
    res.status(200).jsonp({});
});

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
