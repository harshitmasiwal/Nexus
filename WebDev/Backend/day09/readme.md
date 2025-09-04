🔹 1xx → Informational

Server bata raha hai ki request receive ho gayi hai aur process ho rahi hai.

100 Continue → Client ko keh raha hai ki request bhejte raho (mostly large body uploads).

101 Switching Protocols → Client ne naya protocol request kiya (jaise HTTP → WebSocket).

102 Processing → Server request process kar raha hai (WebDAV).

103 Early Hints → Client ko hints milti hain ki kaunse resources preload karne hain.

🔹 2xx → Success

Matlab request sahi se process ho gayi.

200 OK → Request successful (sabse common).

201 Created → Naya resource create hua (jaise POST /users).

202 Accepted → Request accept ho gayi hai, par abhi process baad me hoga.

203 Non-Authoritative Information → Response aaya par modified data hai (proxy ya cache).

204 No Content → Request successful, but return body empty. (e.g. DELETE success).

205 Reset Content → Client ko form reset karna chahiye.

206 Partial Content → Sirf file ka ek hissa send kiya (video/audio streaming).

207 Multi-Status → Multiple resources ke status ek saath (WebDAV).

208 Already Reported → Resource pehle hi report ho chuka (WebDAV).

226 IM Used → Delta updates (rare).

🔹 3xx → Redirection

Client ko dusre URL pe jana hoga.

300 Multiple Choices → Multiple options hain.

301 Moved Permanently → Resource permanently shift ho gaya (SEO important).

302 Found → Temporary redirect.

303 See Other → Response dusre URL pe milta hai (after POST → GET).

304 Not Modified → Cache valid hai, naya data nahi bhejna.

305 Use Proxy → Client ko proxy use karna hoga (deprecated).

307 Temporary Redirect → Same method se dusri jagah request bhejo.

308 Permanent Redirect → Method same rahega, permanent shift ho gaya.

🔹 4xx → Client Error

Matlab galti client ki taraf se hai.

400 Bad Request → Request sahi format me nahi hai.

401 Unauthorized → Authentication required hai.

402 Payment Required → Reserved (kabhi-kabhi API plans me use hota hai).

403 Forbidden → Access allowed nahi hai.

404 Not Found → Resource nahi mila.

405 Method Not Allowed → Wrong HTTP method (e.g. POST on a GET-only route).

406 Not Acceptable → Server woh format return nahi kar sakta jo client chahta hai.

407 Proxy Authentication Required → Proxy ke through authenticate karna hoga.

408 Request Timeout → Client ne time pe request complete nahi ki.

409 Conflict → Resource state conflict (e.g. duplicate entry).

410 Gone → Resource permanently delete ho gaya.

411 Length Required → Content-Length header missing.

412 Precondition Failed → Conditions sahi nahi thi (If-Match, If-None-Match).

413 Payload Too Large → Body size zyada hai.

414 URI Too Long → URL bahut bada hai.

415 Unsupported Media Type → File/content type server accept nahi karta.

416 Range Not Satisfiable → Client ne galat file range maangi.

417 Expectation Failed → Expect header fulfill nahi hua.

418 I’m a Teapot ☕ → Joke status (RFC 2324).

421 Misdirected Request → Request galat server ko chali gayi.

422 Unprocessable Entity → Data sahi format me hai par semantically galat (validation error).

423 Locked → Resource locked hai (WebDAV).

424 Failed Dependency → Dusri request fail ho gayi to ye bhi fail.

425 Too Early → Server risk nahi lena chahta early request ka.

426 Upgrade Required → Client ko higher protocol pe switch karna hoga.

428 Precondition Required → Request me precondition chahiye (optimistic concurrency).

429 Too Many Requests → Rate limit cross ho gayi.

431 Request Header Fields Too Large → Headers zyada bade hain.

451 Unavailable For Legal Reasons → Content legally restricted hai.

🔹 5xx → Server Error

Galti server ki taraf se hai.

500 Internal Server Error → General server crash/error.

501 Not Implemented → Feature implement nahi hai.

502 Bad Gateway → Gateway/proxy ne galat response diya.

503 Service Unavailable → Server overload ya maintenance me hai.

504 Gateway Timeout → Upstream server time pe reply nahi kar raha.

505 HTTP Version Not Supported → HTTP version support nahi hai.

506 Variant Also Negotiates → Content negotiation me problem.

507 Insufficient Storage → Server me storage kam hai.

508 Loop Detected → Infinite loop detect hua.

510 Not Extended → Extra extensions required hain.

511 Network Authentication Required → Network access ke liye login/authentication chahiye (e.g. WiFi login page).