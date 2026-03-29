import {Ratelimit} from "@upstash/Ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";


dotenv.config();

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(5,"20 s")
});

export default ratelimit;


