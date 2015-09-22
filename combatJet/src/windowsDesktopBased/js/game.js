
//variable declarations and defibitions
var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var canvasJet = document.getElementById('canvasJet');
var ctxJet = canvasJet.getContext('2d');
var canvasEnemy = document.getElementById('canvasEnemy');
var ctxEnemy = canvasEnemy.getContext('2d');
var canvasHUD = document.getElementById('canvasHUD');
var ctxHUD = canvasHUD.getContext('2d');
var canvasMeteor = document.getElementById('canvasMeteor');
var ctxMeteor = canvasMeteor.getContext('2d');
var canvasgamend = document.getElementById('canvasgamend');
var ctxgamend = canvasgamend.getContext('2d');

ctxHUD.fillStyle = "hsla(0, 0%, 0%, 0.5)";
ctxHUD.font = "30px Cambria";
window.addEventListener('resize', doResize, false);
var jet1 = new Jet();
var enemies = [];
var meteor = [];
var bgDrawX1 = 0;
var bgDrawX2 = 1600;
var mouseX = 0;
var mouseY = 0;
var isPlaying = false;
var xpressed=false;
var ispoweractive = false;
var isenterpressed = false;
var pausecount = 0;
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 2000 / 60);
                        };

var imgSprite = new Image();
imgSprite.src = 'images/sprite.png';
var imgMeteor= new Image();
imgMeteor.src='images/imagemeteor.png' 
var bg=new Image();
bg.src='images/spritebg.png'
doResize();

var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var btnPlay = new Button(530, 980, 230, 400);
var a,meteorno,enemyjetno;

var bg_music=new Audio();
bg_music.src='sounds/naruto.mp3';
var explosion_sound=new Audio();
explosion_sound.src='sounds/explosion.mp3';
var thunder_sound=new Audio();
thunder_sound.src='sounds/thunder.mp3'
var gameover_sound=new Audio();
gameover_sound.src='sounds/over.mp3';
var win_sound=new Audio();
win_sound.src='sounds/win.mp3';
var power_sound=new Audio();
power_sound.src='sounds/power.mp3';

//end

//  main functions

function spawnEnemy(number) {
    for (var i = 0; i < number; i++) {
        enemies[enemies.length] = new Enemy();
    }
}



function spawnMeteor(number) {
    for (var i = 0; i < number; i++) {
        meteor[meteor.length] = new Meteor();
    }
}

function drawMenu() {
    ctxBg.drawImage(imgSprite, 0, 580, 800, 500, 0, 0, gameWidth, gameHeight);
}

function init() {
    a=0;
    meteorno=10;
    enemyjetno=20;
    jet1.score=0;
     drawBg=function(){
        ctxBg.clearRect(0, 0, gameWidth, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 1600, 500, bgDrawX1, 0, 1600, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 1600, 500, bgDrawX2, 0, 1600, gameHeight);
        }
                    
    spawnEnemy(enemyjetno);
    spawnMeteor(meteorno);
    drawMenu();
    document.addEventListener('click', mouseClicked, false);
    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
}

window.addEventListener("load", init, false);


function doResize(){
canvasBg.width=window.innerWidth;
canvasBg.height=window.innerHeight;
canvasJet.width=window.innerWidth;
canvasJet.height=window.innerHeight;
canvasEnemy.width=window.innerWidth;
canvasEnemy.height=window.innerHeight;
canvasHUD.width=window.innerWidth;
canvasHUD.height=window.innerHeight;
canvasMeteor.width=window.innerWidth;
canvasMeteor.height=window.innerHeight;
canvasgamend.width=window.innerWidth;
canvasgamend.height=window.innerHeight;
var marjet= -canvasBg.height;
canvasJet.style.marginTop= marjet.toString()+"px";
canvasHUD.style.marginTop= marjet.toString()+"px";
canvasEnemy.style.marginTop= marjet.toString()+"px";
canvasMeteor.style.marginTop=marjet.toString()+"px";
canvasgamend.style.marginTop=marjet.toString()+"px";
canvasgamend.style.display="block";
}



function playGame() {
    drawBg();
    bg_music.play();
    bg_music.volume=0.5;
    startLoop();
    updateHUD();
    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
}



function drawAllMeteors() {
    clearCtxMeteor();
     for (var i = 0; i < meteor.length; i++) {
        meteor[i].draw();  
    }
}


function drawAllEnemies() {
    clearCtxEnemy();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function loop() {
    if (isPlaying) {        
        moveBg();
        drawAllMeteors();
        jet1.draw();
        drawAllEnemies();                 
        requestAnimFrame(loop);
        crash();
        crash2();
        level();
        powerclick();
         }
}

function startLoop() {
    isPlaying = true;
    bg_music.loop=true;
    loop();
}

function stopLoop() {
     isPlaying = false;
}


function drawBg() {
    ctxBg.clearRect(0, 0, gameWidth, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 1600, 500, bgDrawX1, 0, 1600, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 1600, 500, bgDrawX2, 0, 1600, gameHeight);
}

function moveBg() {
     bgDrawX1 -= 5;
     bgDrawX2 -= 5;
    if (bgDrawX1 <= -1600) {
        bgDrawX1 = 1600;
    } else if (bgDrawX2 <= -1600) {
        bgDrawX2 = 1600;
    }
    drawBg();
}

function updateHUD() {
    ctxHUD.clearRect(0, 0, gameWidth, gameHeight);
    ctxHUD.fillText("Score: " +  jet1.score, (gameWidth-(gameWidth/10)), (gameHeight-6*(gameHeight/7)));
}

   
    
function pause() {
    
    if (isPlaying && pausecount%2==0) {
        stopLoop();
        ctxgamend.font = "30px ALGERIAN";
        ctxgamend.fillText("The Game has been Paused", (gameWidth / 3), (gameHeight / 7) + 35);
    }
    if (!isPlaying && pausecount % 2 != 0)
    {
        ctxgamend.clearRect(0, 0, gameWidth, gameHeight);
        startLoop();

    }

    
}

function restartgame() {
    ctxgamend.clearRect(0, 0, gameWidth, gameHeight);
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
    ctxJet.clearRect(0, 0, gameWidth, gameHeight);
    ctxMeteor.clearRect(0, 0, gameWidth, gameHeight);
    enemies.length=0;
    meteor.length=0;
    for (var i = 0; i < jet1.bullets.length; i++)
            {
          
            jet1.bullets[i].recycle();
            };
    bg_music.load();
    init();
}

function endgame(crashtype){  
    if (isPlaying) {
        bg_music.pause();
        thunder_sound.pause();
        stopLoop();
        ctxgamend.clearRect(0, 0, gameWidth, gameHeight);
        ctxgamend.font = "30px ALGERIAN";


        if (jet1.score >= 830) {
            win_sound.play();
            ctxgamend.fillText("YOU WON !!!", (gameWidth / 3), (gameHeight / 8));
        }
        else {
            gameover_sound.play();
            ctxgamend.fillText(crashtype, (gameWidth / 3), (gameHeight / 8));
        }
        ctxgamend.fillText("Your Score is " + jet1.score, (gameWidth / 3), (gameHeight / 8) + 35);
    }
        if (isPlaying === false) {
            setTimeout(function () { restartgame() }, 1800);
        }

}


function powerup(){
        jet1.updateCoors();
        ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
          power_sound.play();
          power_sound.volume=0.8;
        for (var i = 0; i < enemies.length; i++)
            {
          
            enemies[i].powerdraw();    
            enemies[i].recycleEnemy();
            };
        for (var i = 0; i<10; i++)
        {
            meteor[i].powerrecycle(200);
        };
        for (var i = 10; i<20; i++)
        {
            meteor[i].powerrecycle(300);
        };
    for (var i = 20; i<meteor.length; i++)
        {
            meteor[i].powerrecycle(100);
        };
    ispoweractive=false;
    jet1.updateScore(20);
    
}
function powercanbeactive(){
    if(jet1.score>=250 && ispoweractive===true){
        ctxgamend.font="30px ALGERIAN";
        ctxgamend.fillText("Press X for Clearing Obstacles !!!",(gameWidth/3),(gameHeight/7)+35);
    }
    
}

function powerclick(){
    if(ispoweractive===true && xpressed===true)
    {
        
        ctxgamend.clearRect(0,0,gameWidth,gameHeight);
        powerup();    
        updateHUD();
    
    }
    
}

function crash(){
    jet1.updateCoors();
for (var i = 0; i < enemies.length; i++)
        {if (enemies[i].drawX >= jet1.drawX-(jet1.width/2) && enemies[i].drawX <= jet1.drawX+(jet1.width/2) )
            {
                if(enemies[i].drawY >= jet1.drawY-25 && enemies[i].drawY <= jet1.drawY+25)
                {
                    ctxgamend.clearRect(0,0,gameWidth,gameHeight);
                    endgame("O GOD you Crashed !!!");
                
                                  }

}

}
 }

 function crash2(){
    jet1.updateCoors();
    
for (var i = 0; i < meteor.length; i++)
        {       if(meteor[i].drawY >= jet1.drawY-25 && meteor[i].drawY <=jet1.drawY+25)
                {
                    if(meteor[i].drawX >= jet1.drawX-(jet1.width)/2 && meteor[i].drawX <= jet1.drawX+(jet1.width)/2){
                        ctxgamend.clearRect(0,0,gameWidth,gameHeight);
                    endgame("OMG you are burning !!!");
                    
                }
                  }

}
 }

 function level(){
    if(isPlaying)
    {
      a=jet1.score/30;
     switch(a)
     {
        case 4:
        drawBg=function(){
            ctxBg.clearRect(0, 0, gameWidth, gameHeight);
            ctxBg.drawImage(bg, 0, 0, 914, 262, bgDrawX1, 0, 1600, gameHeight);
            ctxBg.drawImage(bg, 0, 0, 914, 262, bgDrawX2, 0, 1600, gameHeight);
        }
        thunder_sound.play();
        thunder_sound.loop=true;
        jet1.score=125;
        meteorno=5;
        spawnMeteor(meteorno);
        break;

        case 6:
        drawBg=function(){
            ctxBg.clearRect(0, 0, gameWidth, gameHeight);
            ctxBg.drawImage(bg, 0, 263, 914, 262, bgDrawX1, 0, 1600, gameHeight);
            ctxBg.drawImage(bg, 0, 263, 914, 262, bgDrawX2, 0, 1600, gameHeight);
        }
        jet1.score=185;
        enemyjetno=15;
        spawnEnemy(enemyjetno);
        break;

        case 8:
        drawBg=function(){
            ctxBg.clearRect(0, 0, gameWidth, gameHeight);
            ctxBg.drawImage(bg, 0, 525, 914, 262, bgDrawX1, 0, 1600, gameHeight);
            ctxBg.drawImage(bg, 0, 525, 914, 262, bgDrawX2, 0, 1600, gameHeight);
        }
        jet1.score=245;
        meteorno=5;
        spawnMeteor(meteorno);
        break;

        case 9:
        ispoweractive=true;
        enemyjetno=5;
        spawnEnemy(enemyjetno);
        powercanbeactive();
        jet1.score=290;
        break;

        case 10:
        jet1.score=305;
        meteorno=3;
        enemyjetno=8;
        spawnMeteor(meteorno);
        spawnEnemy(enemyjetno);
        break;

        case 11:
        enemyjetno=5;
        spawnEnemy(enemyjetno);
        jet1.score=350;
        break;
     
        case 14:
        jet1.score=525;
        meteorno=3;
        spawnMeteor(meteorno);
        ispoweractive=true;
        powercanbeactive();
        break;

        case 18:
        ispoweractive=true;
        powercanbeactive();
        break;

        case 22:
        ispoweractive=true;
        powercanbeactive();
        break;

        case 26:
        jet1.score = 830;
        endgame("winner");
        break;
     }
    } 
 }


//end of main functions




// jet functions

function Jet() {
   this.srcX = 0;
    this.srcY = 500;
    this.width = 100;
    this.height = 40;
    this.speed = 3;
    this.drawX = 120;
    this.drawY = 100;
    this.noseX = this.drawX + 100;
    this.noseY = this.drawY + 20;
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isShooting = false;
    this.bullets = [];
    this.currentBullet = 0;
    for (var i = 0; i < 25; i++) {
        this.bullets[this.bullets.length] = new Bullet(this);
    }
    this.score=0;
}

Jet.prototype.draw = function () {
    clearCtxJet();
    this.updateCoors();
    this.checkKeys();
    this.checkShooting();
    this.drawAllBullets();
    ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Jet.prototype.updateCoors = function() {
    this.noseX = this.drawX + 100;
    this.noseY = this.drawY + 20;
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
};



Jet.prototype.checkKeys = function () {
      if (this.isUpKey && this.topY > 0) {
        this.drawY -= this.speed;
    }
    if (this.isRightKey && this.rightX < gameWidth) {
        this.drawX += this.speed;
    }
    if (this.isDownKey && this.bottomY < gameHeight) {
        this.drawY += this.speed;
    }
    if (this.isLeftKey && this.leftX > 0) {
        this.drawX -= this.speed;
    }
};

Jet.prototype.drawAllBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i].drawX >= 0) this.bullets[i].draw();
        if (this.bullets[i].explosion.hasHit) this.bullets[i].explosion.draw();
    }
};

Jet.prototype.updateScore = function(points) {
    this.score += points;
    updateHUD();
    
};

Jet.prototype.checkShooting = function() {
    if (this.isSpacebar && !this.isShooting) {
        this.isShooting = true;
        this.bullets[this.currentBullet].fire(this.noseX, this.noseY);
        this.currentBullet++;
        if (this.currentBullet >= this.bullets.length) this.currentBullet = 0;
    } else if (!this.isSpacebar) {
        this.isShooting = false;
    }
};

function clearCtxJet() {
    ctxJet.clearRect(0,0,gameWidth,gameHeight);
}

// end of jet functions




// bullet functions

function Bullet(j) {
    this.jet = j;
    this.srcX = 100;
    this.srcY = 500;
    this.drawX = -20;
    this.drawY = 0;
    this.width = 30;
    this.height = 10;
    this.explosion = new Explosion();
}

Bullet.prototype.draw = function() {
    this.drawX += 3;
    ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    this.checkHitEnemy();
    if (this.drawX > gameWidth) this.recycle();
};

Bullet.prototype.fire = function(startX, startY) {
    this.drawX = startX;
    this.drawY = startY;
};

Bullet.prototype.checkHitEnemy = function() {
    for (var i = 0; i < enemies.length; i++) {
        if (this.drawX >= enemies[i].drawX &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY >= enemies[i].drawY &&
            this.drawY <= enemies[i].drawY + enemies[i].height) {
                this.explosion.drawX = enemies[i].drawX - (this.explosion.width / 2);
                this.explosion.drawY = enemies[i].drawY;
                this.explosion.hasHit = true;
                this.recycle();
                enemies[i].recycleEnemy();
                this.jet.updateScore(enemies[i].rewardPoints);
        }
    }
};

Bullet.prototype.recycle = function() {
    this.drawX = -20;
};


// end of bullet functions




// explosion functions

function Explosion() {
    this.srcX = 800;
    this.srcY = 500;
    this.drawX = 0;
    this.drawY = 0;
    this.width = 60;
    this.height = 50;
    this.hasHit = false;
    this.currentFrame = 0;
    this.totalFrames = 10;
}

Explosion.prototype.draw = function() {
    if (this.currentFrame <= this.totalFrames) {
        ctxJet.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
        this.currentFrame++;
        explosion_sound.play();
        explosion_sound.volume=0.3;
    } else {
        this.hasHit = false;
        this.currentFrame = 0;
    }
};

// end of explosion functions





//Meteor functions

function Meteor() {
    this.width = 80;
    this.height = 80;
    this.speed = 3;
    this.drawX = Math.floor(Math.random() * gameWidth);
    this.drawY = -50;
}

Meteor.prototype.draw = function () {
    if(a>=2){
    
    this.drawY += this.speed;
    ctxMeteor.drawImage(imgMeteor, this.drawX, this.drawY, this.width, this.height);
    this.checkEscaped();
}
};

function clearCtxMeteor() {
    ctxMeteor.clearRect(0, 0, gameWidth, gameHeight);
}

Meteor.prototype.checkEscaped = function() {
    if (this.drawY >= gameHeight) {
        this.recycleMeteor();
        
    }
};

Meteor.prototype.recycleMeteor = function() {
     this.drawX = Math.floor(Math.random() * gameWidth);
    this.drawY = -50;
};

Meteor.prototype.powerrecycle =function(recyclefactor) {
    this.drawX = Math.floor(Math.random() * gameWidth);
    this.drawY= -recyclefactor;
}



// enemy functions

function Enemy() {
    this.srcX = 0;
    this.srcY = 540;
    this.width = 100;
    this.height = 40;
    this.speed = 2;
    this.drawX = Math.floor((Math.random() * gameWidth) + gameWidth);
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.rewardPoints = 5;
}


Enemy.prototype.draw = function () {
    
    this.drawX -= this.speed;
    ctxEnemy.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    this.checkEscaped();
};

Enemy.prototype.checkEscaped = function() {
    if (this.drawX + this.width <= 0) {
        this.recycleEnemy();
    }
};

Enemy.prototype.recycleEnemy = function() {
     this.drawX = Math.floor((Math.random() * gameWidth)+gameWidth);
    this.drawY = Math.floor(Math.random() * (gameHeight));
};

Enemy.prototype.powerdraw=function(){
    ctxEnemy.drawImage(imgSprite, 750, 500, 50, 50, this.drawX, this.drawY, 50, 50);

}

function clearCtxEnemy() {
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

// end enemy functions




// button object

function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
};

// end of button object



// event functions

function mouseClicked(e) {
    mouseX = e.pageX - canvasBg.offsetLeft;
    mouseY = e.pageY - canvasBg.offsetTop;
   if (isPlaying!=true) {
       if (btnPlay.checkClicked())
           playGame();
    //setTimeout(function(){playGame()},1000);
   }
 }    

function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;

    if (keyID === 13) { //Enter pressed
        isenterpressed = true;
        if (isPlaying != true) {
            if (isenterpressed) {
                playGame();
            }
        } e.preventDefault();
    }

    if (keyID === 38 || keyID === 87) { //up arrow or W key
        jet1.isUpKey = true;
        e.preventDefault();
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        jet1.isRightKey = true;
        e.preventDefault();
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        jet1.isDownKey = true;
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        jet1.isLeftKey = true;
        e.preventDefault();
    }
    if (keyID === 32) { //spacebar
        jet1.isSpacebar = true;
        e.preventDefault();
    }
    if(keyID === 88){ // X
       xpressed = true;
       e.preventDefault();

    }
    if (keyID === 16 || keyID === 80) { // shift
        pause();
        pausecount++;
        e.preventDefault();
    }
}


function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;

    if (keyID === 13) { //Enter released
        isenterpressed = false;
        e.preventDefault();
    }

    if (keyID === 38 || keyID === 87) { //up arrow or W key
        jet1.isUpKey = false;
        e.preventDefault();
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        jet1.isRightKey = false;
        e.preventDefault();
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        jet1.isDownKey = false;
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        jet1.isLeftKey = false;
        e.preventDefault();
    }
     if (keyID === 32) { //spacebar
        jet1.isSpacebar = false;
        e.preventDefault();
    }
    if(keyID === 88){ // X
       xpressed = false;
       e.preventDefault();
    }
    if (keyID === 16 || keyID === 80) { // shift
        e.preventDefault();
    }
}

// end of event functions



