JWT - json web token 
it is the token which helps the user to login in websites 

jwt token contain  = header , payload , digital signnature 
if the hacker changes the header or payload the digital signature changes which helps to detect the fraud

the header and payload are just encrpyted and the 
digital signature is hashed 

encypted thing can be decrypted but hashed thing cannnnot 

once the user send the correct token it get decrpted with applying secret key if the token matches then it is accepted other wise the token is invalid 

we store the token as cookie in our browser 

with the help of payload we also get the user details such as email or any info releted to user 
but it should not contain the private info like password , card details etc as anyone can decrypt the payload using jwt token decoder 

