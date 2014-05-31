# Interstellar

## Overview

A flexible, extensible, 2d particle physics engine that uses fields, particles,
and emitters as its basic building blocks. This came about as a rewrite of my
particle-fields repo to make it significantly faster (10x) and more extensible
and understandable.

## Screenshot

![Example](https://raw.githubusercontent.com/reem/interstellar/images/example.png)

## Tech Stack

This app runs entirely on the client side - the server is simply a shell that
serves static files including bower components.

I used html5 canvas on the front end for rendering speed, lodash where it was
convenient and optimized vanilla js everywhere it was needed. The server is
a simple express nodejs server. I used grunt as my build tool for
minification with browserify for node-style require’s and asynchronous module
loading.

To get started just clone the repo, `npm install`, `grunt deploy` and open 3k.

## Code Map

All of the important code can be found in `public/client`.

`Index.init` is the main entry point to the application, which gets called 
from `main.js`. In it, we set up the canvas, initialize our animation 
function with the canvas, which will actually do all of the drawing to the
screen, then start our animation loop with an initial state and our 
animator.

From there, the app is basically all just modules that work mostly 
independently. Vector is the basic building block that I use to represent
90% of the data in the app. Particle is just a thing with a position,
velocity, and acceleration, all of which are vectors. Fields affect 
particles any way you want, and emitters add particles to the screen
however you want.

The basic ones I have set up emit particles from a point with a certain
velocity and affect fields via gravity, but by subclassing Field and Emitter
and overriding the emit() and affect() methods you can make them have
any behavior you want.

The actual logic of going from one state to the next is represented entirely
in stepper.js, which contains the `update` function which emits, moves, and 
subjects all particles to all fields, then removes all out-of-range 
particles.
