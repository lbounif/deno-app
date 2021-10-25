import { serve } from "https://deno.land/std@0.79.0/http/server.ts";

const server = serve({ port: 4000 });

console.log("Now serving on port 4000");

for await (const req of server) {
    req.respond({ body: "Hello World"});

}