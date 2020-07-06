precision mediump float;

// declare a uniform vec2 variable. We use a vec2 because the mouse has both x and y
// p5 will send data to this variable
uniform vec2 mouse;
uniform vec2 resolution;
uniform float particleX[100];
uniform float particleY[100];
uniform float particleStrength[100];
uniform float strengthConstant;

void main() {

vec2 mouseScaled=mouse/resolution;
vec2 coord=gl_FragCoord.xy;
coord.y=resolution.y-coord.y;

float distMouse=distance(coord,mouse);
float distParticle=0.0;

for(int i=0;i<100;i++){
  vec2 particlePos=vec2(particleX[i],particleY[i]);
  float distToParticle=distance(coord,particlePos);

  if(particleX[i]==0.0 && particleY[i]==0.0)
    continue;

  if(int(distToParticle)<5){
    gl_FragColor = vec4(0,1,0, 1);
    return;
  }
  distParticle+=(1.0/distToParticle)*particleStrength[i]/strengthConstant;
}

float normalized=(1.0/distMouse)*6.0+distParticle;
vec4 finalColor=vec4(1.0,0.5+ max( 1.0-distMouse/100.0,0.0),0,1);
if(normalized>.6)
gl_FragColor =finalColor;
else{
  gl_FragColor = vec4(0,0,0, 1);
}
  
}