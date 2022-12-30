precision lowp float;
varying vec2 vUv;
uniform float uTime;

#define PI 3.1415926

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// 旋转
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

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

    // float strength = abs(vUv.x - 0.5);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);
    
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = floor(vUv.x*10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = floor(vUv.y*10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = floor(vUv.x*10.0) / 10.0 * floor(vUv.y*10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = ceil(vUv.x*10.0) / 10.0 * ceil(vUv.y*10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = random(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = ceil(vUv.x*10.0) / 10.0 * ceil(vUv.y*10.0) / 10.0;
    // strength = random(vec2(strength, strength));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = length(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = distance(vUv,vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 1.0 - distance(vUv,vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);
    
    // float strength = 1.0 - 0.15 / distance(vUv,vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 0.15 / distance(vUv,vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // strength *= 0.15 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // vec2 rotateUv = rotate(vUv, -uTime, vec2(0.5));
    // float strength = 0.15 / distance(vec2(rotateUv.x, (rotateUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // strength *= 0.15 / distance(vec2(rotateUv.y, (rotateUv.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
    // gl_FragColor = vec4(strength, strength, strength, 1);


    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);
    
    // float strength = 1.0 - step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.35);
    // strength *= (1.0 - step(0.5, distance(vUv, vec2(0.5)) + 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 35靶心
    // float strength = step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 36圆环
    // float strength = 1.0 - step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 37 波浪环
    // float strength = 1.0 - step(0.1, abs(distance(vUv, vec2(0.5)) - 0.25));

    // vec2 waveUv = vec2(
    //     vUv.x,
    //     vUv.y+sin(vUv.x*30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5))-0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // vec2 waveUv = vec2(
    //     vUv.x,
    //     vUv.y+sin(vUv.x*30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5))-0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // vec2 waveUv = vec2(
    //     vUv.x+sin(vUv.y*30.0) * 0.1,
    //     vUv.y+sin(vUv.x*30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5))-0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // vec2 waveUv = vec2(
    //     vUv.x+sin(vUv.y*100.0) * 0.1,
    //     vUv.y+sin(vUv.x*100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5))-0.25));
    // gl_FragColor = vec4(strength, strength, strength, 1);
     
    // 根据角度显示视图
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1);
    

    // 根据角度实现螺旋渐变
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle-3.14/6.28;
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 42 雷达扫射
    // float alpha = 1.0 - step(0.1, abs(distance(vUv, vec2(0.5))));
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor = vec4(strength, strength, strength, alpha);
     
    // vec2 rotateUv = rotate(vUv, -uTime*5.0, vec2(0.5));
    // float alpha = 1.0 - step(0.1, abs(distance(vUv, vec2(0.5))));
    // float angle = atan(rotateUv.x - 0.5, rotateUv.y - 0.5);
    // float strength = (angle+3.14)/6.28;
    // gl_FragColor = vec4(strength, strength, strength, alpha);

    // 万花筒
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5)/PI;
    // float strength = mod(angle*10.0, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1);

    // 光芒四射
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5)/(2.0*PI);
    float strength = sin(angle*100.0);
    gl_FragColor = vec4(strength, strength, strength, 1);
}