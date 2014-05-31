# Interstellar

A flexible, extensible, 2d particle physics engine that uses fields, particles,
and emitters as its basic building blocks. This came about as a rewrite of my
particle-fields repo to make it significantly faster (10x) and more extensible
and understandable.

This app runs entirely on the client side - the server is simply a shell that
serves static files including bower components.

I used html5 canvas on the front end for rendering speed, lodash where it was
convenient and optimized vanilla js everywhere it was needed. The server is
a simple express nodejs server. I used grunt as my build tool for
minification with browserify for node-style require’s and asynchronous module
loading.

To get started just clone the repo, `npm install`, `grunt deploy` and open 3k.
