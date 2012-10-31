image_resize
============

node.js server to resize (crop really) images on the fly

#Usage:
```
npm install;  
node server.js  
```
then click on the link below  
[http://localhost:3000/?w=800&h=600&u=http://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg](http://localhost:3000/?w=800&h=600&u=http://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg)

#Reference projects
http://www.jeff.wilcox.name/2011/10/node-express-imagemagick-square-resizing/  
https://github.com/tildeio/rsvp.js/pull/4 (can't remember where i originally got the promisify stuff from)

#Dependencies
###xcode
needs version 4.5.1

###imagemagick
getting this working is a pain if you've just switched from lion to mountain lion...good luck.  
```
brew install imagemagick
```
or if you have an old version of imagemagick
```
brew uninstall imagemagick
brew install --fresh imagemagick
```

#Notes
Current passes jshint, but clashes with jslint's very opinionated style rules.
