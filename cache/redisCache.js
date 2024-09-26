const redis = require('redis');

class Cache{
    redisPort = process.env.REDIS_PORT || 6379;
    client;

    constructor() {
        // this.client = redis.createClient(this.redisPort);
        // this.client.on("error", (error) => console.error(`Error : ${error}`));
        (async () => {
            this.client = redis.createClient();
            this.client.on("error", (error) => console.error(`Error : ${error}`));
            await this.client.connect();
        })();
    }


    set(key, value, ttl = 3600) {
        this.client.set(key, JSON.stringify(value), {
            EX: ttl,
            NX: true,
        });
    }

    async get(key){
        let data = await this.client.get(key);
        if(!data) return null;
        return JSON.parse(data);
    }

    del(keys) {
        this.client.del(keys, function(err, response) {
            if (err) throw err;
            console.log(response);
        });
    }

}

module.exports = Cache;