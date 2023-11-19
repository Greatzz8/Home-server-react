# React Frontend for my home server

This is the frontend part of [Home Server](https://github.com/Greatzz8/home-server). 

## Setup

To use it, clone this repo and run

```bash
npm install
```

to install all dependencies. 

You need manully change the server_ip in componets/Constant.js to the real server ip address before building the production version.

Run

```bash
npm run build
```

to build the production codes. 

After finishing building, copy the "build" folder and paste it under the static folder in the backend. You need also change the index.html in build folder. You need to add 'build/' to all the paths. For example, you need to change

```html
<link href="/static/css/main.015c0167.css" rel="stylesheet">
```

to

```html
<link href="build/static/css/main.015c0167.css" rel="stylesheet">
```

[Home Server](https://github.com/Greatzz8/home-server) repo has already contained the build folder so you don't need this step. You can directly use that repo and follow instructions there. But if you want to change some codes in frontend then you will need this step (replacing the build folder).

## Things You Might Want to Change

In components/Uploader.js line 62 there is:

```javascript
const max_retry = 50;
```

The reason it is needed is that the server may still need some time to copy the file uploaded from temp folder to the current folder you are, especially when the file is large. The reload_current function won't be called until it finishes the copying. So the number here really depends on your server disk speed. If the speed is low you should change it to a bigger number.
