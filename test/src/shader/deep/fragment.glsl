precision lowp float;
varying vec2 vUv;
uniform float uTime;

void main() {
    // gl_FragColor = vec4(vUv,0,1.0);
    // gl_FragColor = vec4(vUv,1.0,1.0);

    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1);
 
    // float strength = 1.0 - vUv.y;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = (1.0 - vUv.y ) * 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = vUv.y * 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1);


    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = step(0.2, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.2, mod(vUv.y * 10.0, 1.0));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float barX = step(0.4, mod(vUv.x + uTime * 0.1 * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y + uTime * 0.1 * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1);
    // gl_FragColor = vec4(vUv, 1.0, strength);

    // float barX = step(0.4, mod(vUv.x  * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y  * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = barX + barY;
    // gl_FragColor = vec4(strength, strength, strength, 1);


    // float strength = vUv.y - 0.5;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = vUv.y - 0.5;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = abs(vUv.y - 0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    float strength = abs(vUv.x - 0.5);
    gl_FragColor = vec4(strength, strength, strength, 1);

}