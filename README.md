## NPM projects generator

This generator will server to create NPM projects with `Javasscript` and `Typescript` based on the library projects developed in this course.


## Requirements
* Node 12.13.0
* NPM => 6.12.0

### Install
```shell script
    npm install -g genarot-node-project-generator-cli
```

### Usage
```shell script
    npm-project-generator
```

### Contribute

Feel free to contribute to our project

### Author
Genaro Tinoco <genaro_13@hotmail.es>

#### Log Example
``` html
[gtinoco@192 ~]$ npm-project-generator
? What type of project are you going to build? npm-ts
? What is the name of the project? my-project
CREATE  /home/gtinoco/my-project/.gitignore (21) bytes
CREATE  /home/gtinoco/my-project/.mocharc.json (214) bytes
CREATE  /home/gtinoco/my-project/README.md (133) bytes
CREATE  /home/gtinoco/my-project/lib/index.ts (62) bytes
CREATE  /home/gtinoco/my-project/package.json (529) bytes
CREATE  /home/gtinoco/my-project/test/test-ts.ts (204) bytes
CREATE  /home/gtinoco/my-project/tsconfig.json (2723) bytes
Installing project dependencies into /home/gtinoco/my-project
npm WARN deprecated mkdirp@0.5.3: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN my-project@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 118 packages from 100 contributors and audited 220 packages in 3.916s
found 0 vulnerabilities
```
