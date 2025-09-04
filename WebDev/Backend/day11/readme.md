json.parse() bekar hai parsing ke liye from express.json() kuyki if data strrem hamari chote pakets mai aati hai to usko express.json() to handel kar leta hai but json.parse() ko ek baari mai hi saara data chiye then hi wo execute hota hai 

database -> A database is an organized, electronic collection of data managed by a database management system (DBMS), which allows users to store, access, and update information efficiently

database secondry storage hota hai jisme hamm harddisk mai daata store karte hai in style like aur isme hamm structured data store karte hai as wo data pe queries chalana assan padta hai and alsoo 
hamm images video ko isme store directly na karke unko cloud pe upload karke unke links aur metadata ko attach kar dete hai in out structed database kuyki uske upar ham query laga sakte hai jese video length greater than 10 min etc 

DBMS manage karta hai database ke andr hone wale operatioons and the querysss ko kese execute karna hai

aur ek aur reason jiski wajh se ham badi video store nahi karte database mai directly as jab ham query execute karte hai to ram mai database se each row aati hai then operations perform hote hai if hamari ram 1 gb ki hai aur data mai video 500 mb ki hai har row mai then ek time pe bass do row check ho payegi jisse bhut time lag jayega query ko execute hone mai 

excel sheet database nahi hai as uski rows limited hoti hai aur ek time pe multiple bande jab uspe change karte hai then wo lag karti hai aur kabhi kabhi changes unregistred rheete hai 

ACID PROPERTY OF SQL MAKES IT SUITABLE FOR BANKING APPS

