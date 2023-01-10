precision lowp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
varying vec4 vPosition;
varying vec4 gPosition;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    vPosition = modelPosition;
    gPosition = vec4( position, 1.0 );
    gl_Position =  projectionMatrix * viewMatrix * modelPosition;
}