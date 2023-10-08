var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";
var worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg"

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(2, 100, 100);

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load(textureURL);
var displacementMap = textureLoader.load(displacementURL);
var worldTexture = textureLoader.load(worldURL);

var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.06,
  bumpMap: displacementMap,
  bumpScale: 0.04,
  reflectivity: 0,
  shininess: 0
});

var moon = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-100, 10, 50);
scene.add(light);

hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

var worldGeometry = new THREE.SphereGeometry(1000, 60, 60);
var worldMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: worldTexture,
  side: THREE.BackSide
});
var world = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(world);

var moonRadius = 2;
var latitude = -84; // Latitudine sulla superficie
var longitude = -134; // Longitudine sulla superficie
var x = moonRadius * Math.sin(latitude) * Math.cos(longitude);
var y = moonRadius * Math.sin(latitude) * Math.sin(longitude);
var z = moonRadius * Math.cos(latitude);
var clickablePointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
var clickablePointMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var clickablePoint = new THREE.Mesh(clickablePointGeometry, clickablePointMaterial);
clickablePoint.position.set(x, y, z); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint); // Aggiungi il punto cliccabile come figlio della luna


var latitude2 = -37; // Latitudine sulla superficie
var longitude2 = 42; // Longitudine sulla superficie
var x2 = moonRadius * Math.sin(latitude2) * Math.cos(longitude2);
var y2 = moonRadius * Math.sin(latitude2) * Math.sin(longitude2);
var z2 = moonRadius * Math.cos(latitude2);
var clickablePointGeometry2 = new THREE.SphereGeometry(0.1, 0.1, 32, 32);
var clickablePointMaterial2 = new THREE.MeshBasicMaterial({ color: 0x6495ed });
var clickablePoint2 = new THREE.Mesh(clickablePointGeometry2, clickablePointMaterial2);
clickablePoint2.position.set(x2, y2, z2); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint2); // Aggiungi il punto cliccabile come figlio della luna

var moonRadius = 2;
var latitude3 = 3; // Latitudine sulla superficie
var longitude3 = -58; // Longitudine sulla superficie
var x3 = moonRadius * Math.sin(latitude3) * Math.cos(longitude3);
var y3 = moonRadius * Math.sin(latitude3) * Math.sin(longitude3);
var z3 = moonRadius * Math.cos(latitude3);
var clickablePointGeometry3 = new THREE.SphereGeometry(0.1, 0.01, 12, 48);
var clickablePointMaterial3 = new THREE.MeshBasicMaterial({ color: 0x5f9ea0 });
var clickablePoint3 = new THREE.Mesh(clickablePointGeometry3, clickablePointMaterial3);
clickablePoint3.position.set(x3, y3, z3); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint3);

var moonRadius = 2;
var latitude4 = 50; // Latitudine sulla superficie
var longitude4 = 30; // Longitudine sulla superficie
var x4 = moonRadius * Math.sin(latitude4) * Math.cos(longitude4);
var y4 = moonRadius * Math.sin(latitude4) * Math.sin(longitude4);
var z4 = moonRadius * Math.cos(latitude4);
var clickablePointGeometry4 = new THREE.SphereGeometry(0.1, 0.01, 12, 48);
var clickablePointMaterial4 = new THREE.MeshBasicMaterial({ color: 0x008000 });
var clickablePoint4 = new THREE.Mesh(clickablePointGeometry4, clickablePointMaterial4);
clickablePoint4.position.set(x4, y4, z4); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint4);

var moonRadius = 2;
var latitude5 = 21; // Latitudine sulla superficie
var longitude5 = 88; // Longitudine sulla superficie
var x5 = moonRadius * Math.sin(latitude5) * Math.cos(longitude5);
var y5 = moonRadius * Math.sin(latitude5) * Math.sin(longitude5);
var z5 = moonRadius * Math.cos(latitude5);
var clickablePointGeometry5 = new THREE.SphereGeometry(0.1, 0.01, 12, 48);
var clickablePointMaterial5 = new THREE.MeshBasicMaterial({ color: 0xdaa520 });
var clickablePoint5 = new THREE.Mesh(clickablePointGeometry5, clickablePointMaterial5);
clickablePoint5.position.set(x5, y5, z5); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint5);

const wireframe = new THREE.WireframeGeometry( geometry );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

var addButton = document.getElementById("moonButton");
addButton.style.top = '50px';
addButton.style.left = '50px';

var isGridVisible = false; // Variabile di stato per la griglia

addButton.addEventListener("click", function() {
    if (isGridVisible) {
        scene.remove(line); // Rimuove la linea dalla scena
        isGridVisible = false;
    } else {
        scene.add(line); // Aggiunge la linea alla scena
        isGridVisible = true;
    }
    // Dopo aver aggiunto la linea, ricarica il gestore di eventi per i punti cliccabili
    document.removeEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
});

//scene.add( line );

var clickablePointMaterial3 = new THREE.MeshBasicMaterial({ color: 0x5f9ea0 });
var clickablePoint3 = new THREE.Mesh(clickablePointGeometry3, clickablePointMaterial3);
clickablePoint3.position.set(x3, y3, z3); // Imposta la posizione del punto cliccabile
moon.add(clickablePoint3); // Aggiungi il punto cliccabile come figlio della luna







scene.add(moon);
camera.position.z = 5;

moon.rotation.x = 3.1415 * 0.02;
moon.rotation.y = 3.1415 * 1.54;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown(event) {
  event.preventDefault();

  // Calcola la posizione del mouse in coordinate relative alla finestra
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Imposta l'origine del raggio e la direzione dal mouse
  raycaster.setFromCamera(mouse, camera);

  // Trova gli oggetti intersecati dal raggio
  var intersects = raycaster.intersectObjects([clickablePoint]);

if (intersects.length > 0) {

  var existingDiv = document.querySelector('.popup');
  if (existingDiv) {
    document.body.removeChild(existingDiv);
  }

    var magnitudeDiv = document.createElement('div');
    magnitudeDiv.textContent = 'Magnitude: 3.2';
    magnitudeDiv.innerHTML +=  '<br> Year: 03/23/1973';
    magnitudeDiv.innerHTML += '<br> Hour: 07:56:30'
    magnitudeDiv.className = 'popup'; // Aggiungi eventuali classi CSS desiderate

    // Posiziona la div appena creata
    magnitudeDiv.style.position = 'absolute';
    magnitudeDiv.style.top = '50px'; // Personalizza il posizionamento in base alle tue esigenze
    magnitudeDiv.style.right = '50px'; // Personalizza il posizionamento in base alle tue esigenze

    // Aggiungi la div al tuo documento HTML
    document.body.appendChild(magnitudeDiv);
}

var intersects = raycaster.intersectObjects([clickablePoint2]);

if (intersects.length > 0) {
  // Rimuovi la div precedente se esiste
  var existingDiv = document.querySelector('.popup');
  if (existingDiv) {
    document.body.removeChild(existingDiv);
  }

  var magnitudeDiv = document.createElement('div');
  magnitudeDiv.textContent = 'Magnitude: 0.9';
  magnitudeDiv.innerHTML += '<br> Year: 04/19/1974';
  magnitudeDiv.innerHTML += '<br> Hour: 13:35:15'
  magnitudeDiv.className = 'popup'; // Aggiungi eventuali classi CSS desiderate

  // Posiziona la div appena creata
  magnitudeDiv.style.position = 'absolute';
  magnitudeDiv.style.top = '50px'; // Personalizza il posizionamento in base alle tue esigenze
  magnitudeDiv.style.right = '50px'; // Personalizza il posizionamento in base alle tue esigenze

  // Aggiungi la div al tuo documento HTML
  document.body.appendChild(magnitudeDiv);
}

var intersects2 = raycaster.intersectObjects([clickablePoint3]);

if (intersects2.length > 0) {
  // Rimuovi la div precedente se esiste
  var existingDiv = document.querySelector('.popup');
  if (existingDiv) {
    document.body.removeChild(existingDiv);
  }

  var magnitudeDiv = document.createElement('div');
  magnitudeDiv.textContent = 'Magnitude: 1.4';
  magnitudeDiv.innerHTML += '<br> Year: 05/27/1975';
  magnitudeDiv.innerHTML += '<br> Hour: 23:29:00'
  magnitudeDiv.className = 'popup'; // Aggiungi eventuali classi CSS desiderate

  // Posiziona la div appena creata
  magnitudeDiv.style.position = 'absolute';
  magnitudeDiv.style.top = '50px'; // Personalizza il posizionamento in base alle tue esigenze
  magnitudeDiv.style.right = '50px'; // Personalizza il posizionamento in base alle tue esigenze

  // Aggiungi la div al tuo documento HTML
  document.body.appendChild(magnitudeDiv);
}

var intersects = raycaster.intersectObjects([clickablePoint4]);

if (intersects.length > 0) {

  var existingDiv = document.querySelector('.popup');
  if (existingDiv) {
    document.body.removeChild(existingDiv);
  }

  var magnitudeDiv = document.createElement('div');
  magnitudeDiv.textContent = 'Magnitude: 1.8';
  magnitudeDiv.innerHTML +=  '<br> Year: 01/04/1976';
  magnitudeDiv.innerHTML += '<br> Hour: 11:18:55'
  magnitudeDiv.className = 'popup'; // Aggiungi eventuali classi CSS desiderate

  // Posiziona la div appena creata
  magnitudeDiv.style.position = 'absolute';
  magnitudeDiv.style.top = '50px'; // Personalizza il posizionamento in base alle tue esigenze
  magnitudeDiv.style.right = '50px'; // Personalizza il posizionamento in base alle tue esigenze

  // Aggiungi la div al tuo documento HTML
  document.body.appendChild(magnitudeDiv);
}

var intersects = raycaster.intersectObjects([clickablePoint5]);

if (intersects.length > 0) {

  var existingDiv = document.querySelector('.popup');
  if (existingDiv) {
    document.body.removeChild(existingDiv);
  }

  var magnitudeDiv = document.createElement('div');
  magnitudeDiv.textContent = 'Magnitude: 2.7';
  magnitudeDiv.innerHTML +=  '<br> Year: 07/11/1974';
  magnitudeDiv.innerHTML += '<br> Hour: 00:46:30'
  magnitudeDiv.className = 'popup'; // Aggiungi eventuali classi CSS desiderate

  // Posiziona la div appena creata
  magnitudeDiv.style.position = 'absolute';
  magnitudeDiv.style.top = '50px'; // Personalizza il posizionamento in base alle tue esigenze
  magnitudeDiv.style.right = '50px'; // Personalizza il posizionamento in base alle tue esigenze

  // Aggiungi la div al tuo documento HTML
  document.body.appendChild(magnitudeDiv);
}

}

document.addEventListener('mousedown', onDocumentMouseDown, false);

function animate() {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.002;
  moon.rotation.x += 0.0001;
  world.rotation.y += 0.0001
  world.rotation.x += 0.0005
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);

animate();

var clickablePoints = [clickablePoint, clickablePoint2, clickablePoint3, clickablePoint4, clickablePoint5];


var clickablePointMagnitude = 3.2;
var clickablePointMagnitude2 = 0.9;
var clickablePointMagnitude3 = 1.4;
var clickablePointMagnitude4 = 1.8;
var clickablePointMagnitude5 = 2.7;

var clickablePointYear = "03/23/1973";
var clickablePointYear2 = "04/19/1974";
var clickablePointYear3 = "05/27/1975";
var clickablePointYear4 = "01/04/1976";
var clickablePointYear5 = "07/11/1974";

var clickablePointHour = "07:56:30";
var clickablePointHour2 = "13:35:15";
var clickablePointHour3 = "23:29:00";
var clickablePointHour4 = "11:18:55";
var clickablePointHour5 = "00:46:30";

var clickablePointsMagnitude = [clickablePointMagnitude, clickablePointMagnitude2, clickablePointMagnitude3, clickablePointMagnitude4, clickablePointMagnitude5];
var clickablePointsYear = [clickablePointYear, clickablePointYear2, clickablePointYear3, clickablePointYear4, clickablePointYear5];
var clickablePointsHour = [clickablePointHour, clickablePointHour2, clickablePointHour3, clickablePointHour4, clickablePointHour5];


var selectedPoint = null; // Tieni traccia del punto selezionato

var pointcolor1 = 0xffff00;
var pointcolor2 = 0x6495ed;
var pointcolor3 = 0x5f9ea0;
var pointcolor4 = 0x008000;
var pointcolor5 = 0xdaa520;

function highlightPoint(point) {
  if(selectedPoint==clickablePoint){
    selectedPoint.material.color.set(pointcolor1);
  }else if (selectedPoint==clickablePoint2) {
    selectedPoint.material.color.set(pointcolor2);
  }else if (selectedPoint==clickablePoint3) {
    selectedPoint.material.color.set(pointcolor3);
  }
  else if (selectedPoint==clickablePoint4) {
    selectedPoint.material.color.set(pointcolor4);
  }
  else if (selectedPoint==clickablePoint5) {
    selectedPoint.material.color.set(pointcolor5);
  }
  point.material.color.set(0xff0000); // Imposta il colore del punto selezionato a giallo
  selectedPoint = point; // Aggiorna il punto selezionato
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(clickablePoints);

  if (intersects.length > 0) {
    var point = intersects[0].object;
    highlightPoint(point);

    // Continua con la gestione delle informazioni relative al punto cliccato
    // ...

    // Rimuovi la div precedente se esiste
    var existingDiv = document.querySelector('.popup');
    if (existingDiv) {
      document.body.removeChild(existingDiv);
    }

    var magnitudeDiv = document.createElement('div');

    if(selectedPoint==clickablePoint){
      clickablePointsMagnitude= clickablePointMagnitude;
    }else if (selectedPoint==clickablePoint2) {
      clickablePointsMagnitude= clickablePointMagnitude2;
    }else if (selectedPoint==clickablePoint3) {
      clickablePointsMagnitude= clickablePointMagnitude3;
    }
    else if (selectedPoint==clickablePoint4) {
      clickablePointsMagnitude= clickablePointMagnitude4;
    }
    else if (selectedPoint==clickablePoint5) {
      clickablePointsMagnitude= clickablePointMagnitude5;
    }

    if(selectedPoint==clickablePoint){
      clickablePointsYear= clickablePointYear;
    }else if (selectedPoint==clickablePoint2) {
      clickablePointsYear= clickablePointYear2;
    }else if (selectedPoint==clickablePoint3) {
      clickablePointsYear= clickablePointYear3;
    }
    else if (selectedPoint==clickablePoint4) {
      clickablePointsYear= clickablePointYear4;
    }
    else if (selectedPoint==clickablePoint5) {
      clickablePointsYear= clickablePointYear5;
    }

    if(selectedPoint==clickablePoint){
      clickablePointsHour= clickablePointHour;
    }else if (selectedPoint==clickablePoint2) {
      clickablePointsHour= clickablePointHour2;
    }else if (selectedPoint==clickablePoint3) {
      clickablePointsHour= clickablePointHour3;
    }
    else if (selectedPoint==clickablePoint4) {
      clickablePointsHour= clickablePointHour4;
    }
    else if (selectedPoint==clickablePoint5) {
      clickablePointsHour= clickablePointHour5;
    }






    magnitudeDiv.textContent = 'Magnitude: '+ clickablePointsMagnitude ; // Esempio di informazioni
    // Aggiungi altre informazioni qui
    magnitudeDiv.innerHTML +=  '<br> Year: '+ clickablePointsYear;
    magnitudeDiv.innerHTML += '<br> Hour: '+ clickablePointsHour;

    magnitudeDiv.className = 'popup';
    magnitudeDiv.style.position = 'absolute';
    magnitudeDiv.style.top = '50px';
    magnitudeDiv.style.right = '50px';

    document.body.appendChild(magnitudeDiv);
  }
}

document.addEventListener('mousedown', onDocumentMouseDown, false);

// Inizializza il colore iniziale del punto selezionato
highlightPoint(clickablePoint);
