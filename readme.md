# Comics 3D
3D interactive comics.
## Features for minimum tech demo
* Loads a 3D scene with a sequence of scenes exported from Blender
* Has a rudimentary light system with point lights and sun lights
* Has a very basic PBR based material system (microfacet, SSS, and lambertian). Aim for material compatibility with Blender EEVEE engine
* On command can step through the sequence
* Freely movable or restricted cameras (along splines maybe, or maybe defined in Blender somehow)
* Able to load the scene at a given frame based on a parameter in the URL

## Current tech stack
* `Ngnix` on `Ubuntu Server` to serve files (since everything is a static file anyway)
* `three.js` for rendering scenes in the browser
* `Blender 2.80` for all 3D work
* `COLLADA`/`glTF` format for scene export (prefer `glTF` because it's web friendly)