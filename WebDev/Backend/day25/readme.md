Sliding Window Rate Limiter with Redis Sorted Set

Key:

User ka IP address store karenge as the Redis key.

Example: "rate_limit:192.168.0.5"

Value (member):

Sorted set me ek random unique string daalenge (jaise uuid ya Math.random().toString()).

Purpose: Sorted set ke liye har entry ek member chaahiye hota hai, to bas dummy value hi insert karni hoti hai.

Score:

Date.now() (current timestamp in ms).

Ye help karega time-based queries (pichle 60 second ke andar kitne request aaye).

Expiry:

Key par TTL (Time to Live) set kar denge (e.g., EXPIRE ip 60).

Taaki Redis me old data automatic delete ho jaye aur memory leak na ho. 
 
 

now we will implement the sliding window for the Rate Limiter insted of the fixed window

in siding window we will store the 
key -> ip address
value -> mai random value so that set mai insert ho jaaye arram se 
score -> mai current time de denge (Date.now())

now also we will set the expiration time of the key after 60 seconds or what we want

const no_of_requests_made = await redisClient.zCard(ip) 
isse ham no of requests count kar sakte hai zCard(key de do) iski maddad se 
jese hi limit se exceed karti hai req ki count then user ko error throw kar denge ham

