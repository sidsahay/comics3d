# Comics 3D
3D interactive comics.
## Features for minimum tech demo
* Loads a 3D scene with a sequence of scenes exported from Blender
* Has a rudimentary light system with point lights and sun lights
* Has a very basic PBR based material system (microfacet, SSS, and lambertian). Aim for material compatibility with Blender EEVEE engine
* On command it can step through the sequence of scenes
* Freely movable or restricted cameras (along splines, or maybe defined in Blender somehow)
* Able to load the scene at a given frame based on a parameter in the URL

## Current tech stack
* `three.js` for rendering scenes in the browser
* `Blender 2.80` for all 3D work
* `Collada`/`gltf` format for scene export (prefer `gltf` because it's web friendly)

## "Build" instructions
* Install `npm` (usually just means installing `Node.js`) and run `npm install` in the project root
* Install `http-server` for convenience (optional)
* Run `npx webpack` and then access `index.html` from the browser (remember to serve it via `http-server` (just run that in the root directory) or some other server because stuff won't load otherwise)

## Notes (WIP)
* To match cameras in `Blender` set the camera sensor thing to `Vertical` and change the two sensor size values to the same value.
* `Three.js` docs recommend enabling `physicallyCorrectLights` and `gammaOutput`, and setting the `gammaFactor` to `2.2`.
* For shadows enable shadowmaps in the renderer, set lights to cast shadows, and set objects to cast shadows and receive shadows.