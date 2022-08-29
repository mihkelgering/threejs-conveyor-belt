const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'canvas';
document.body.appendChild( renderer.domElement );

//textures
const texture = new THREE.TextureLoader().load( 'assets/texture.jpg' );
const boxtexture = new THREE.TextureLoader().load( 'assets/box.jpg' );

const geometry = new THREE.BoxGeometry( 1, 0.5, 3 );
const material = new THREE.MeshBasicMaterial( {map: texture} );
const cube = new THREE.Mesh( geometry, material );
const group = new THREE.Group();
const warning = document.getElementById('warning');



const box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( {map: boxtexture} ) );
box.name = "box";
box.position.set(0,0.75,0);

camera.position.set(4, 4, 8);
camera.lookAt(7, 0, 0);
scene.add(group);


//mousewheel listener for creating production line  cubes
let num = 0;
addEventListener('wheel', (event) => {
    if (event.wheelDelta < 0) {
        if (num < 20){
            const cube = new THREE.Mesh( geometry, material );
            cube.position.x = num;
            group.add( cube );
            num += 1;
        }else if (num == 20){
            const kek = document.getElementById('info');
            kek.innerText = "C - Create a box \n A - Move box left \n D - Move box rigt \n M - Move box automatically to the end. \n R - Reset"
            
            num += 1;
        }
    }
});


//keyboard listener
addEventListener('keydown', (event) => {

    //reset
    if (event.key == 'r'){ 
        location.reload();
    }

    //move right
    if (event.key == 'd'){
        if (box.position.x < 18.9 && box.name != "moving"){
            box.position.x += 0.05;
        }
        else if (box.name != "moving"){
            scene.remove(box);
        }
    }

    //move right
    if (event.key == 'a'){
        if (box.position.x > 0 && box.name != "moving"){
            box.position.x -= 0.05;
        }
    }

    // box automatic movement
    if (event.key == 'm' && scene.children.length > 1 && scene.children[0].children.length == 20){
        if (box.name !=='moving'){
        movebox();
        }
    }
    
    // create box
    if (event.key == 'c' && scene.children.length < 2 && scene.children[0].children.length == 20){
        scene.add(box);
        box.position.set(0,0.75,0);
    }else if (event.key == 'c' && scene.children[0].children.length < 20) {

        setWarning("Warning: You need 20 blocks in total");

    }else if (event.key == 'c' && scene.children.length > 1){
        setWarning("Warning: You can have only one box at the same time.")
    }
    
    
});


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

function movebox() {
    const interval = setInterval(move,10)
    function move(){
        if (box.position.x < 18.9){
            box.name = "moving";
            box.position.x += 0.05;
        }
        else{
            scene.remove(box);
            box.name = "box";
            clearInterval(interval);
        }
    }
    
  }

  function setWarning(message){
    warning.innerText = message;
    setTimeout(() => {
        console.log("Delayed for 3 seconds.");
        warning.innerText = " "
      }, 3000)
      
  }

animate();