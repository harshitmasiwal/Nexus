we just want one way encrption 

we convert our password to the hashed password then we cant decrpyt it (best practice)
it will save us from retrival of our password by the hacker 

if we want to authenticate any user we will hash the password given by him and match the hash with the hash which was previously stored if it matches we will grant him acess else we will not authorise it 

their are various algorithims which are used for excrption some of them are sha256 etc 
as we change only one word it changes whole hash like an avalanch effect 

but as the hacker evolved they created the RAINBOW TABLE which has all the commonly used password with their corrosponding hash 

so what we done that we added salt to the default password of the user which confuses the hacker more 

we have two options we can use same salt for every user of diffrent 
but if we start to use the same salt for every user then if salt is hacked or retrived their is possiblity of leaking multiple users data at the same time as the hacker can see the multiples same hashes so he will try to crack themm 

$2b$11$QAVPGrb.WzrVcSg0S1eowO //salt 
$2b$11$QAVPGrb.WzrVcSg0S1eowOenAEO9fvmmZPBs.YAus5SqFyihZnNu2 //salt + password 

$2b$11$ this tells that we are using bcrypt version 2 and 11 rounds during salt
QAVPGrb.WzrVcSg0S1eowO this is our actual salt (22 charaters)
enAEO9fvmmZPBs.YAus5SqFyihZnNu2 this is our actal hased password (31 characters)

when we comapre we pass the user inp password and stored hash in our db 
if the salt + user inp password matches the same hash it means user is verified 

as we increse the rounds in the gensalt the time will increse 
as the genSalt(11) means run the algo 2^11 times on the salt 

bcrypt.genSalt(16)
Ye bas ek random salt string generate karta hai.
Salt banane ka kaam bahut hi fast hota hai (microseconds ya milliseconds).
Isliye salt: 1ms aaya.

bcrypt.hash(password, salt)
Ye actual heavy computation karta hai.
Salt ke andar "cost factor" (ya rounds) embedded hota hai → tumne 16 diya hai.
Matlab bcrypt ko internally 2^16 ≈ 65,536 times hashing rounds karne padte hain.
Isi wajah se ye bahut slow hota hai (~3.7 sec).

👉 Cost factor (10, 12, 16 ...) decide karta hai ki kitne rounds of computation karne hain.

Cost 10 → fast (~100ms)

Cost 16 → bahut slow (~3–5 sec, jaise tumne dekha)


✅ Summary

salt → fast (random string generate)

hash → slow (2^cost rounds computation)

Tumne cost 16 diya → isliye 3–4 second lag gaye

👉 Real-world apps me usually 10–12 cost factor use hota hai (speed + security balance).
16 jyada heavy hai, production me rare use hota hai.


