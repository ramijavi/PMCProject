//Aproximate planet diameters in kilometers
var planetDiameters = [4900, 12000, 12700, 6800, 140000, 120000, 50000, 49000];
//Aproximate orbit distance from the surface of the sun in millions of kilometers
var orbitDistances = [58, 108, 147, 228, 778, 1195, 2870, 4498];
//Aproximate planets' rotational speed around the sun in rotations/time where time is measured in Earth days
var orbitPeriods = [88, 225, 365, 687, 4332, 10767, 30687, 60190];
//Approximate diameter of the sun in kilometers
var sunDiameter = 1390000;
var angles = [0, 0, 0, 0, 0, 0, 0, 0];
var angle = 0;
var speed = 0.005;
var rotationalSpeed = [];

function setup(){
  
    createCanvas(1100, 630, WEBGL);
    
    for(i = 0; i < orbitPeriods.length; i++){
        rotationalSpeed[i] = 1/orbitPeriods[i];
    }
}

function draw(){
    
    background(0);

    orbitControl();
    
    noStroke();
    
    //Sun
    push();
    translate(0, 0, 0);
    fill(0, 255, 255);
    sphere(sunDiameter/100000);
    pop();
    
    for(i = 0; i < 2; i++){

        let x = ((sunDiameter/20000) + orbitDistances[i]/2) * cos(angles[i]);
        let z = ((sunDiameter/20000) + orbitDistances[i]/2) * sin(angles[i]);
        
        translate(x, 0, z);
     
        fill(0, 255, 0);
        sphere(planetDiameters[i]/1000);

        if(i == 0){
            angles[i] = angles[i] + 0.01;
        } else if (i == 1){
            angles[i] = angles[i] + 0.005;
        }
        
        //print(angles);
        
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

