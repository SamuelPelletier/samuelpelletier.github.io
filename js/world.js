//===================================================== add Scene
var scene = new THREE.Scene();
//===================================================== add Camera
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
camera.position.x = 180;
camera.position.y = 180;
camera.position.z = 40;
//===================   ================================== add front & back lighting
var light = new THREE.DirectionalLight(new THREE.Color("white"), 1);
light.position.set(1, 3, 2).normalize();
scene.add(light);

var light = new THREE.DirectionalLight(new THREE.Color("white"), 1);
light.position.set(-1, -3, -2).normalize();
scene.add(light);
//===================================================== add Grid
/*  var plane = new THREE.GridHelper(5000, 10);
  plane.material.color = new THREE.Color( 'white');
  scene.add(plane);*/

//===================================================== add canvas
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.LinearToneMapping;
document.body.appendChild(renderer.domElement);

//===================================================== add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//===================================================== add GLow
var renderScene = new THREE.RenderPass(scene, camera);
var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
effectFXAA.uniforms["resolution"].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
);
var copyShader = new THREE.ShaderPass(THREE.CopyShader);
copyShader.renderToScreen = true;

var bloomStrength = 1;
var bloomRadius = 0;
var bloomThreshold = 0.5;
var bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    bloomStrength,
    bloomRadius,
    bloomThreshold
);

var composer = new THREE.EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(renderScene);
composer.addPass(effectFXAA);
composer.addPass(bloomPass);
composer.addPass(copyShader);

//===================================================== resize
window.addEventListener("resize", function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//===================================================== data
const our_data = [
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Londres", latitude: 51.507322, longitude: -0.127647}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Stockolm", latitude: 59.3251, longitude: 18.0711}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Madrid", latitude: 40.4167047, longitude: -3.7035825}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Barcelone", latitude: 41.3828939, longitude: 2.1774322}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Cork", latitude: 51.8979282, longitude: -8.4705806}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Athènes", latitude: 37.9841493, longitude: 23.7279843}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Rome", latitude: 41.894802, longitude: 12.4853384}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "La Valette", latitude: 35.899, longitude: 14.513699999999972}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Lisbonne", latitude: 38.7077507, longitude: -9.1365919}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Prague", latitude: 50.0874654, longitude: 14.4212535}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Sofia", latitude: 42.6978634, longitude: 23.3221789}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Mayence", latitude: 50.0012314, longitude: 8.2762513}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Bangkok", latitude: 13.7538929, longitude: 100.8160803}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Vancouver", latitude: 49.2608724, longitude: -123.1139529}
    },
    {
        origin: {name: "Vancouver", latitude: 49.2608724, longitude: -123.1139529},
        destination: {name: "Victoria", latitude: 48.4283, longitude: -123.36500000000001}
    },
    {
        origin: {name: "Genève", latitude: 46.201756, longitude: 6.1466601},
        destination: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549}
    },
    {
        origin: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549},
        destination: {name: "Akita", latitude: 39.71999141600613, longitude: 140.10159542675785}
    },
    {
        origin: {name: "Akita", latitude: 39.71999141600613, longitude: 140.10159542675785},
        destination: {name: "Aomori", latitude: 40.819684653852356, longitude: 140.74907943505855}
    },
    {
        origin: {name: "Aomori", latitude: 40.819684653852356, longitude: 140.74907943505855},
        destination: {name: "Sendai", latitude: 38.2677554, longitude: 140.8691498}
    },
    {
        origin: {name: "Sendai", latitude: 38.2677554, longitude: 140.8691498},
        destination: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549}
    },
    {
        origin: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549},
        destination: {name: "Osaka", latitude: 34.6937569, longitude: 135.5014539}
    },
    {
        origin: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549},
        destination: {name: "Sapporo", latitude: 43.061936, longitude: 141.3542924}
    },
    {
        origin: {name: "Tokyo", latitude: 35.6828387, longitude: 139.7594549},
        destination: {name: "Okinawa", latitude: 26.2122345, longitude: 127.6791452}
    },
    {
        origin: {name: "Osaka", latitude: 34.6937569, longitude: 135.5014539},
        destination: {name: "Hiroshima", latitude: 34.3916058, longitude: 132.4518156}
    },
    {
        origin: {name: "Osaka", latitude: 34.6937569, longitude: 135.5014539},
        destination: {name: "Kanazawa", latitude: 36.5780499, longitude: 136.6480247}
    },
];

//===================================================== helper functions
const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const DEGREE_TO_RADIAN = Math.PI / 180;

function coordinateToPosition(lat, lng, radius) {
    const phi = (90 - lat) * DEGREE_TO_RADIAN;
    const theta = (lng + 180) * DEGREE_TO_RADIAN;

    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

//===================================================== d3.json
d3.json(
    "https://raw.githubusercontent.com/baronwatts/data/master/world.json",
    function (err, data) {
        //===================================================== crate canvas texturefor the globe
        var projection = d3.geo
            .equirectangular()
            .translate([1024, 512])
            .scale(326);

        var countries = topojson.feature(data, data.objects.countries);

        var canvas = d3
            .select("body")
            .append("canvas")
            .style("display", "none")
            .attr("width", "2048px")
            .attr("height", "1024px");

        var context = canvas.node().getContext("2d");

        var path = d3.geo
            .path()
            .projection(projection)
            .context(context);

        context.strokeStyle = "white";
        context.lineWidth = 0.25;
        context.fillStyle = "#000";

        context.beginPath();

        path(countries);

        context.fill();
        context.stroke();

        var mapTexture = new THREE.Texture(canvas.node());
        mapTexture.needsUpdate = true;

        //===================================================== add globe
        var group = new THREE.Group();
        scene.add(group);
        group.rotateX(Math.PI / 8);

        var RADIUS = 140;

        var sphereGeometry = new THREE.SphereGeometry(RADIUS, 60, 60);
        var sphereMaterial = new THREE.MeshPhongMaterial({
            map: mapTexture,
            transparent: true,
            opacity: 1,
            color: new THREE.Color("white")
        });
        var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        earthMesh.name = "earth";
        group.add(earthMesh);

        //===================================================== add glow effect to globe
        var customMaterial = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: document.getElementById("vertexShader").textContent,
            fragmentShader: document.getElementById("fragmentShader").textContent,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        var ballGeometry = new THREE.SphereGeometry(170, 60, 60);
        var ball = new THREE.Mesh(ballGeometry, customMaterial);
        scene.add(ball);

        //===================================================== lng & lat
        function Destination(array) {
            array.map((d, i) => {
                //convert lng & lat coordinates to 3d space
                var startLat = d.origin.latitude;
                var startLng = d.origin.longitude;

                var endLat = d.destination.latitude;
                var endLng = d.destination.longitude;

                var x = -(
                    RADIUS *
                    Math.sin((90 - startLat) * (Math.PI / 180)) *
                    Math.cos((startLng + 180) * (Math.PI / 180))
                );
                var z =
                    RADIUS *
                    Math.sin((90 - startLat) * (Math.PI / 180)) *
                    Math.sin((startLng + 180) * (Math.PI / 180));
                var y = RADIUS * Math.cos((90 - startLat) * (Math.PI / 180));

                var x2 = -(
                    RADIUS *
                    Math.sin((90 - endLat) * (Math.PI / 180)) *
                    Math.cos((endLng + 180) * (Math.PI / 180))
                );
                var z2 =
                    RADIUS *
                    Math.sin((90 - endLat) * (Math.PI / 180)) *
                    Math.sin((endLng + 180) * (Math.PI / 180));
                var y2 = RADIUS * Math.cos((90 - endLat) * (Math.PI / 180));

                //store the starting and ending positions of each location
                var start = new THREE.Vector3(x, y, z);
                var end = new THREE.Vector3(x2, y2, z2);

                //points
                var pointGeom = new THREE.SphereGeometry(1, 10, 10);
                var point = new THREE.Mesh(
                    pointGeom,
                    new THREE.MeshBasicMaterial({color: new THREE.Color("white")})
                );
                var point2 = new THREE.Mesh(
                    pointGeom,
                    new THREE.MeshBasicMaterial({color: new THREE.Color("white")})
                );

                //spaces out the points
                point.position.set(x, y, z);
                point2.position.set(x2, y2, z2);
                point.lookAt(new THREE.Vector3(0, 0, 0));
                point2.lookAt(new THREE.Vector3(0, 0, 0));
                group.add(point);
                group.add(point2);

                //https://medium.com/@xiaoyangzhao/drawing-curves-on-webgl-globe-using-three-js-and-d3-draft-7e782ffd7ab
                const CURVE_MIN_ALTITUDE = 20;
                const CURVE_MAX_ALTITUDE = 100;
                const altitude = clamp(
                    start.distanceTo(end) * 0.75,
                    CURVE_MIN_ALTITUDE,
                    CURVE_MAX_ALTITUDE
                );

                //get the middle position of each location
                var lat = [startLng, startLat];
                var lng = [endLng, endLat];
                var geoInterpolator = d3.geoInterpolate(lat, lng);

                const midCoord1 = geoInterpolator(0.25);
                const midCoord2 = geoInterpolator(0.75);

                const mid1 = coordinateToPosition(
                    midCoord1[1],
                    midCoord1[0],
                    RADIUS + altitude
                );
                const mid2 = coordinateToPosition(
                    midCoord2[1],
                    midCoord2[0],
                    RADIUS + altitude
                );

                //create bezier curve from the lng & lat positions
                var curve = new THREE.CubicBezierCurve3(start, mid1, mid2, end);
                var g = new THREE.TubeGeometry(curve, 100, 0.35, 10, false);
                var m = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(
                        "hsl(" + Math.floor(Math.random() * 360) + ",50%,50%)"
                    )
                });
                curveObject = new THREE.Mesh(g, m);
                group.add(curveObject);
            })
            ;
        } //end Destination()

        Destination(our_data);

        //===================================================== add Animation
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            composer.render();
        }

        animate();
    }
); //end d3.json
