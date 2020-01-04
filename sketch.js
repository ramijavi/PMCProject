// Aproximate planet diameters, in kilometers
var planetDiameters = [4900, 12000, 12700, 6800, 140000, 120000, 50000, 49000];
// Aproximate orbit distance from the surface of the sun, in millions of kilometers
var orbitDistances = [58, 108, 147, 228, 778, 1195, 2870, 4498];
// Aproximate planets' rotational speed around the sun in rotations/time, where time is measured in Earth days
var orbitPeriods = [88, 225, 365, 687, 4332, 10767, 30687, 60190];
// Approximate diameter of the sun, in kilometers
var sunDiameter = 1390000;
// Array of angles used to calculate planet's position in space
var angles = [0, 0, 0, 0, 0, 0, 0, 0];
// Array that will store images of the planets' surfaces
var planetTextures = [];
// Array that will contain the speed of each planet
var rotationalSpeed = [];
// Arrays that will hold sliders
var sliders1 = [];
var sliders2 = [];
// Array that will hold buttons
var buttons = [];
// Font variable
var spaceFont;
// Boolean variable to control the type of light in the sketch
var pntLight = false;

// Function that preloads all assets needed in the sketch
function preload() {
    
    // Load font
    spaceFont = loadFont('spaceAge.otf');
    
    // Load planets' textures
    sunTexture = loadImage('surfaceImages/sunSurface.jpg');
    planetTextures[0] = loadImage('surfaceImages/mercurySurface.png');
    planetTextures[1] = loadImage('surfaceImages/venusSurface.jpg');
    planetTextures[2] = loadImage('surfaceImages/earthSurface.jpg');
    planetTextures[3] = loadImage('surfaceImages/marsSurface.png');
    planetTextures[4] = loadImage('surfaceImages/jupiterSurface.jpg');
    planetTextures[5] = loadImage('surfaceImages/saturnSurface.jpg');
    planetTextures[6] = loadImage('surfaceImages/uranusSurface.jpg');
    planetTextures[7] = loadImage('surfaceImages/neptuneSurface.jpg');
}

// Set up function
function setup(){
  
    // Create a 3D canvas
    createCanvas(1260, 710, WEBGL);
    
    // Calculate planets' speeds. These speeds are not at all realistic, though
    // they are proportional to one another
    for(i = 0; i < orbitPeriods.length; i++){
        rotationalSpeed[i] = 1/orbitPeriods[i];
    }
    
    // Create & position slider to control simulation speed
    sliders1[0] = createSlider(1, 60, 1);
    sliders1[0].position(10, 60);
    sliders1[0].style('width', '250px');
    
    // Create & position slider to control orbit distance
    sliders1[1] = createSlider(0.3, 7, 0.3);
    sliders1[1].position(10, 120);
    sliders1[1].style('width', '250px');
    
    // Create & position slider to control the camera's X axis
    sliders2[0] = createSlider(-2000, 2000, 0);
    sliders2[0].position(950, 60);
    sliders2[0].style('width', '250px');
    
    // Create & position slider to control the camera's Y axis
    sliders2[1] = createSlider(-1800, 1600, -100);
    sliders2[1].position(950, 120);
    sliders2[1].style('width', '250px');
    
    // Create & position slider to control the camera's Z axis
    sliders2[2] = createSlider(sunDiameter/60000, 6000, 1300);
    sliders2[2].position(950, 180);
    sliders2[2].style('width', '250px');
    
    // Create & position button to turn on the ambient light
    buttons[0] = createButton('Ambient Light');
    buttons[0].position(10, 180);
    buttons[0].mousePressed(fakeLight);
    buttons[0].size(120);
    
    // Create & position button to turn on the realistic light
    buttons[1] = createButton('Realistic Light');
    buttons[1].position(140, 180);
    buttons[1].mousePressed(realLight);
    buttons[1].size(120);
    
    // Only the buttons above are actually used as buttons
    
    // All the buttons below are used as labels. This is because if
    // we use the text() function in WEBGL mode, the text generated
    // won't stay in place as we move the camera around
    buttons[2] = createButton('Simulation Speed');
    buttons[2].position(10, 30);
    buttons[2].size(250);
    
    buttons[3] = createButton('Orbit Distance');
    buttons[3].position(10, 95);
    buttons[3].size(250);
    
    buttons[4] = createButton('Light');
    buttons[4].position(10, 150);
    buttons[4].size(250);
    
    buttons[5] = createButton('Camera Controls');
    buttons[5].position(950, 10);
    buttons[5].size(250);
    
    buttons[6] = createButton('X Axis');
    buttons[6].position(950, 35);
    
    buttons[7] = createButton('Y Axis');
    buttons[7].position(950, 95);
    
    buttons[8] = createButton('Z Axis');
    buttons[8].position(950, 155);
}

// Drawing function
function draw(){
    
    // Background
    background(0);
   
    // Display text using a custom font
    textFont(spaceFont);
    textSize(50);
    text("Solar System Simulator", -400, -330);
    
    // Disable drawing stroke
    noStroke();
    
    // Set up the camera using the values from the sliders
    camera(sliders2[0].value(), sliders2[1].value(), sliders2[2].value(), 0, 0, 0, 0, 1, 0);
    
    // Draw the sun, using the preloaded image of its surface as a texture
    push();
    translate(0, 0, 0);
    texture(sunTexture);
    sphere((sunDiameter/2)/3000);
    pop();
    
    // If indicated by user, turn on point light
    // This point light imitates the light radiated by sun, only hitting the planets
    // on the side that faces the sun
    if(pntLight){
        pointLight(250, 250, 250, 0, 0, 0);
    }
    
    // Loop through every element of the orbitDistances array
    for(i = 0; i < orbitDistances.length; i++){

        // Calculate the X and Z components of the position of every planet using trigonometry functions
        let x = ((sunDiameter/2)/(3000) + (orbitDistances[i]*sliders1[1].value())) * cos(angles[i]);
        let z = ((sunDiameter/2)/(3000) + (orbitDistances[i]*sliders1[1].value())) * sin(angles[i]);
        
        // Draw every planet, using the preloaded image of their surface as a texture
        push();
        translate(x, 0, z);
        texture(planetTextures[i]);
        sphere((planetDiameters[i]/2)/3000);
        pop();
        
        // Update the angle of every planet using their speed
        angles[i] = angles[i] + (rotationalSpeed[i]*sliders1[0].value());
    }
}

// Function activated by "Ambient Light" button
function fakeLight(){
    pntLight = false;
}

// Function activated by "Realistic Light" button
function realLight(){
    pntLight = true;
}
