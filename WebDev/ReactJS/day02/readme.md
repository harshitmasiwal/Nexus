<!-- we can write the code like day01 code but these are the few issues we will face -->

the BABBLE help us to write the code like html in js 
Babel is a powerful and widely-used JavaScript compiler
we call the file then JSX 


the code will be retirved from the links src or if we pasted the entire code in the file it will increse its size which will be not production friendly 
also the code contain various unused code from the recat or react dom but we didnt need it our file so we use the bundler 

BUNDLER 

-> bundler help our code for making it production ready 
-> bundler example are vite , parcel and webpack n others 
-> bundler optimises the code
-> bundler automatically removes the comments and other unwanted stuff from the code and help our code to production ready 
-> bundler also helps the user to maintain the project 

we will use the parcel bundler 

PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npm init

this will create a package.json

{
  "name": "day02",
  "version": "1.0.0",
  "description": "<!-- we can write the code like day01 code but these are the few issues we will face -->",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "parcel": "^2.15.4"
  }
}


npm i parcel

this will install all the packages in node_module folder 

and u can see many other folder with the parcel folder and the other came due to the parcel dependencies which being used by it 

now we can install 
PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npm i react 
PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npm i react-dom

now we can see the   
"dependencies": {
    "parcel": "^2.15.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }

gets updated storing all the versions of the packages 

All about the VERSIONS

the version contain the three digits 

ex - 10.05.01

the first digit 10. -> denotes the major update 
the second digit .05 -> denotes the minor update 
the third digit .01 -> denotes the bug fix/patch update

when the update is major then their is a change that if we didnt update the codebase it can crash due to major changes inside the functions 

minor update can not be serious but can be judged on the basis of the carrot and the ~ symbol 
ex - ^19.2.23 or ~21.22.12 
do chat gpt here


the package.lock.json stores the more info about the dependencies version and it helps to run the code same at every system at any time and we can delete the node_module folder and if anyone want it back he/she can just do npm install which will install all the dependencies



//to use the files of react from react dom we have to use the import statement in our js code so it use the react and react-dom from node modules folder

and for running the page we have open the server using 
PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npx parcel index.html
and sometimes we have to remove the main : "index.js" from the package.json file


//we also get the two folder parcel-cache folder it stores the cached data of our file 
if we delete and then run the server or cmd
PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npx parcel index.html
Server running at http://localhost:1234
✨ Built in 188ms 

we can see it takes the 188ms time 
and if we re run without deleting it 

PS C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day02> npx parcel index.html
Server running at http://localhost:1234
✨ Built in 15ms

so this is the simple diffrence 


//also we got the dist folder it contains the optimised code which is being actually used from the react file and also we got 3 files inside it 
refer image.png
the map file act like a key for js file to comvert it into human readable form 
without this file only the machine can understand our code and algorithim we are using in our js file


//now if u want to deploy into the production you can place the dist folder after removing the map file from it 

//lets deploy the dist folder in netilfy

now the website is deployed on the link 
https://idyllic-sorbet-681c1c.netlify.app/

just by using the js and html file of dist folder

