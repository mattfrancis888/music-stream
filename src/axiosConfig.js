import axios from "axios";
//Used for onine JSON-store database
const streams = axios.create({
    // .. where we make our configurations
    baseURL: "https://music-json-server.now.sh/db.json",
    headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        // "Access-Control-Allow-Headers":
        //     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Content-Type": "application/json",
    },
});

export default streams;
