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
varying vec2 vUv;
varying float vWave;

void main() {
  // Simple check to ensure we are rendering texture
  vec2 uv = vUv;
  vec4 textureColor = texture2D(uTexture, uv + vWave * 0.1);
  gl_FragColor = textureColor;
}
`;
