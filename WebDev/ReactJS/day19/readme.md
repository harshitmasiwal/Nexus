npx parcel src/index.html --no-cache --no-hmr 

use this cmd to run the parcel app with tailwind 
so this error gets fixed 


Error: ENOENT: no such file or directory, unlink 'C:\Users\Kamle\AppData\Local\Temp\index.html.10188.6'
    at Object.unlinkSync (node:fs:1952:11)
    at WriteStream.<anonymous> (C:\Users\Kamle\Desktop\Nexus\WebDev\ReactJS\day19\node_modules\@parcel\fs\lib\index.js:1142:83)
    at Object.onceWrapper (node:events:633:26)
    at WriteStream.emit (node:events:530:35)
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'unlink',
  path: 'C:\\Users\\Kamle\\AppData\\Local\\Temp\\index.html.10188.6'
}

