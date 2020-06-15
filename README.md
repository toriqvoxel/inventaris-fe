# Inventaris Frontend

### For backend checkout this repo
- Backend :point_right:  **[here!](https://github.com/toriqvoxel/inventaris.git "here!")**

### Installation

Invetaris frontend requires [Node.js](https://nodejs.org/) v10 to run.

Install the required dependencies and start the server.

```sh
$ git clone https://github.com/toriqvoxel/inventaris-fe.git
$ cd inventaris-fe
$ npm install
$ npm install vue-cli -g
```

#### Setup backend api for default base url
1. Go to /src/main.js . 
2. Search this line ```axios.defaults.baseURL = "http://localhost:1339/"```
3. Change ```http://localhost:1339/``` with your backend endpoint.
4. Save


### Build and serve the frontend
#### For build

```sh
$ npm run build
```

### For development and hot reload

```sh
$ npm run serve
```


### Lints and fixes files
```sh
$ npm run lint
``` 
