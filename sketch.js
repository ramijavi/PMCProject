//Aproximate planet diameters in kilometers
var planetDiameters = [4900, 12000, 12700, 6800, 140000, 120000, 50000, 49000];
//Aproximate orbit distance from the surface of the sun in millions of kilometers
var orbitDistances = [58, 108, 147, 228, 778, 1195, 2870, 4498];
//Aproximate planets' rotational speed around the sun in rotations/time where time is measured in Earth days
var orbitPeriods = [88, 225, 365, 687, 4332, 10767, 30687, 60190];
//Approximate diameter of the sun in kilometers
var sunDiameter = 1390000;
var angles = [0, 0, 0, 0, 0, 0, 0, 0];
var speed = 0.005;
var planetTextures = [];
var rotationalSpeed = [];
var sliders1 = [];
var sliders2 = [];
var spaceFont;

function preload() {
    
    spaceFont = loadFont('spaceAge.otf');
    
    sunTexture = loadImage('sunSurface.jpg');
    
    planetTextures[0] = loadImage('mercurySurface.png');
    planetTextures[1] = loadImage('venusSurface.jpg');
    planetTextures[2] = loadImage('earthSurface.jpg');
    planetTextures[3] = loadImage('marsSurface.png');
    planetTextures[4] = loadImage('jupiterSurface.jpg');
    planetTextures[5] = loadImage('saturnSurface.jpg');
    planetTextures[6] = loadImage('uranusSurface.jpg');
    planetTextures[7] = loadImage('neptuneSurface.jpg');
}

function setup(){
  
    createCanvas(1260, 710, WEBGL);
    
    for(i = 0; i < orbitPeriods.length; i++){
        rotationalSpeed[i] = 1/orbitPeriods[i];
    }
    
    sliders1[0] = createSlider(1, 60, 1);
    sliders1[0].position(10, 60);
    sliders1[0].style('width', '250px');
    
    sliders1[1] = createSlider(0.6, 20, 0.6);
    sliders1[1].position(10, 120);
    sliders1[1].style('width', '250px');
    
    sliders2[0] = createSlider(200, 4000, 2100);
    sliders2[0].position(700, 60);
    sliders2[0].style('width', '250px');
    
    sliders2[1] = createSlider(-1600, 800, -400);
    sliders2[1].position(700, 120);
    sliders2[1].style('width', '250px');
    
    sliders2[2] = createSlider(-2000, 2000, 0);
    sliders2[2].position(700, 180);
    sliders2[2].style('width', '250px');
}

function draw(){
    
    background(0);
    
    //textFont(spaceFont);
    //textSize(30);
    //fill(255);
    //text("Solar System Simulator", -620, -330);
    //textSize(14);
    //text("Simulation Speed", -620, -300);
    //text("Distance from the sun", -620, -240);
    //text("Size of the Sun", -300, -300);
    //textSize(10);
    //text("Simulation-friendly", -620, -200);
    //text("Real", -400, -200);
    //text("Simulation-friendly", -300, -260);
    //text("Real", -80, -260);
    
    //orbitControl();
    
    noStroke();
    
    camera(sliders2[0].value(), sliders2[1].value(), sliders2[2].value(), 0, 0, 0, 0, 1, 0);
    
    //Sun
    push();
    translate(0, 0, 0);
    //fill(0, 255, 0);
    //noFill();
    //stroke(255);
    texture(sunTexture);
    sphere((sunDiameter/2)/(3000));
    pop();
    
    noStroke();
    
    directionalLight(250, 250, 250, -1, -1, -1);
    
    for(i = 0; i < orbitDistances.length; i++){

        let x = ((sunDiameter/2)/(3000) + (orbitDistances[i]*sliders1[1].value())) * cos(angles[i]);
        let z = ((sunDiameter/2)/(3000) + (orbitDistances[i]*sliders1[1].value())) * sin(angles[i]);
        
        push();
        translate(x, 0, z);
        //fill(255, 255, 0);
        texture(planetTextures[i]);
        sphere(planetDiameters[i]/6000);
        pop();
        
        angles[i] = angles[i] + (rotationalSpeed[i]*sliders1[0].value());
        
    }
    
    //print(rotationalSpeed);
    //print(angles);
    //Mercury
    //var x = radius * cos(angle);
	//var z = radius * sin(angle);
    //translate(x, 0, z);     
    //sphere(40);
    //angle = angle + speed;
}
