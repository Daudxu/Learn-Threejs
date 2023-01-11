precision lowp float;
varying vec4 vPosition;
varying vec4 gPosition;

uniform vec3 uHightColor;
uniform vec3 uLowColor;
uniform float uOpacity;

varying float vElevation;



void main(){
    float a = (vElevation+1.0)/2.0;
    vec3 color = mix(uLowColor, uHightColor, a);
    gl_FragColor = vec4(color, uOpacity);
}