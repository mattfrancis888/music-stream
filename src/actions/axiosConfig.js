import axios from "axios";
//Used for onine JSON-store database
const streams = axios.create({
    // .. where we make our configurations
    baseURL: "https://music-stream-backend.now.sh/",
});

export default streams;
