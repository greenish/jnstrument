/**
 * Multiply each vertex by the
 * model-view matrix and the
 * projection matrix (both provided
 * by Three.js) to get a final
 * vertex position
 */

attribute float functions[1000];


void main() {
  	gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}