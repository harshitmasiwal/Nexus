install the typescript compiler because we write code in typescript and then it get converted into the 
javascript using this compiler as the browser understands only html , css and js

npm install -g typescript
tsc --version

tsc app.ts to complie the program in default old version 

tsc app.ts --target es2016  setting a specific version 

tsc --init //it initilise tsconfig.json file in the directory which manages all the seeting releted to the conversion of the typescript to js file

now you can just use (tsc)
tsc command to convert all the ts files to their corrosponding js files

we get error like this 
PS C:\Users\Kamle\Desktop\Nexus\WebDev\TypeScript\day01> tsc
app.ts:11:20 - error TS2737: BigInt literals are not available when targeting lower than ES2020.

11 let money:bigint = 93333333333333333339n
                      ~~~~~~~~~~~~~~~~~~~~~


Found 1 error in app.ts:11

PS C:\Users\Kamle\Desktop\Nexus\WebDev\TypeScript\day01> 

if we targrting the old sciipt which has not the specific functiinality 



if we wantt the changes to be reflected live then we can use this command 
tsc --watch