export const vertexShader = `
varying vec2 vUv;
varying float vWave;
uniform float uTime;
uniform float uSpeed;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Distortion based on speed and time
  float distortion = sin(pos.y * 10.0 + uTime) * (uSpeed * 0.1);
  pos.x += distortion;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vWave = distortion;
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform float uSpeed;
varying vec2 vUv;
varying float vWave;

void main() {
  vec2 uv = vUv;
  float shift = uSpeed * 0.005; // Adjust strength of aberration

  // Chromatic Aberration: Sample R, G, B with offsets
  float r = texture2D(uTexture, uv + vec2(shift, 0.0) + vWave * 0.1).r;
  float g = texture2D(uTexture, uv + vWave * 0.1).g;
  float b = texture2D(uTexture, uv - vec2(shift, 0.0) + vWave * 0.1).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
`;
