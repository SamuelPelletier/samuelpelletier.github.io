var canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = {x: 0, y: 0},
    radius = 1;

var colors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x, y) {
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = {
        x: x,
        y: y
    };
    this.r = Math.random() * 5 + 2;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;

    this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function () {


    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt(a * a + b * b);
    if (distance < (radius * 70)) {
        this.accX = (this.x - mouse.x) / 100;
        this.accY = (this.y - mouse.y) / 100;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e) {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}

function onTouchEnd(e) {
    mouse.x = -9999;
    mouse.y = -9999;
}

function initScene() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold " + (ww / 10) + "px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(copy.value, ww / 2, wh / 2);

    var data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    particles = [];
    for (var i = 0; i < ww; i += Math.round(ww / 150)) {
        for (var j = 0; j < wh; j += Math.round(ww / 150)) {
            if (data[((i + j * ww) * 4) + 3] > 150) {
                particles.push(new Particle(i, j));
            }
        }
    }
    amount = particles.length;

}

function onMouseClick() {
    radius++;
    if (radius === 5) {
        radius = 0;
    }
}

function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);


// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
// svg path for plane icon
var planeSVG = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";


var chart = AmCharts.makeChart("chartdiv2", {
    "type": "serial",
    "theme": "dark",
    "marginRight": 70,
    "dataProvider": [{
        "langage": "Shell & Bash",
        "lvl": 6,
        "color": "#ff0000"
    }, {
        "langage": "Git",
        "lvl": 8,
        "color": "#ff6600"
    }, {
        "langage": "C & C++",
        "lvl": 7,
        "color": "#ffc000"
    }, {
        "langage": "GO",
        "lvl": 6,
        "color": "#ffff00"
    }, {
        "langage": "SQL",
        "lvl": 9,
        "color": "#99ff66"
    }, {
        "langage": "C#",
        "lvl": 7,
        "color": "#33cc33"
    }, {
        "langage": "Java & Android",
        "lvl": 6,
        "color": "#008000"
    }, {
        "langage": "Swift",
        "lvl": 6,
        "color": "#000099"
    }, {
        "langage": "Python",
        "lvl": 4,
        "color": "#0066ff"
    }, {
        "langage": "PHP / Symfony",
        "lvl": 9,
        "color": "#00b0f0"
    }, {
        "langage": "HTML/CSS",
        "lvl": 9,
        "color": "#ff99ff"
    }, {
        "langage": "JavaScript",
        "lvl": 8,
        "color": "#660066"
    }, {
        "langage": "Google Script",
        "lvl": 6,
        "color": "#8A0CCF"
    }],
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Langages de programmations",
        "maximum": 10,
        "minimum": 0
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "lvl"
    }],
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "langage",
    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
    },
    "export": {
        "enabled": true
    }

});

$.fn.commentCards = function () {

    return this.each(function () {

        var $this = $(this),
            $cards = $this.find('.card'),
            $current = $cards.filter('.card--current'),
            $next;

        $cards.on('click', function () {
            if (!$current.is(this)) {
                $cards.removeClass('card--current card--out card--next');
                $current.addClass('card--out');
                $current = $(this).addClass('card--current');
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass('card--next');
            }
        });

        if (!$current.length) {
            $current = $cards.last();
            $cards.first().trigger('click');
        }

        $this.addClass('cards--active');

    })

};

$('.cards').commentCards();


$(document).ready(function () {

    var
        words = $('#tagi text'),
        l = words.length,
        current = null,
        delay = 2000;

    function clearBlink(o) {
        var
            ca = o.getAttribute('class').split(' '),
            i = ca.indexOf('blink');

        if (i !== -1) {
            ca.splice(i, 1);
            o.setAttribute('class', ca.join(' '));
        }
    }

    function addBlink(o) {
        var
            ca = o.getAttribute('class').split(' ');
        ca.push('blink');
        o.setAttribute('class', ca.join(' '));
    }

    function wordblink() {

        var e;

        if (current !== null) {
            clearBlink(words.eq(current)[0])
        }

        current = Math.floor(Math.random() * l);
        e = words.eq(current);
        addBlink(e[0]);

        setTimeout(wordblink, delay);
    }

    wordblink();

});