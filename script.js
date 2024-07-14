
    const canvas = document.getElementById("canvas");
    
    const button=document.getElementById('but');
    const reset=document.getElementById('reset');

    let animate=null;

    if (canvas) {
      canvas_width = canvas.width;
      canvas_height = canvas.height;
    }
  
    const ball = {
      x: canvas_width / 2,
      y: canvas_height / 2,
      rad: 25,
      dx: 5,
      dy: 4
    };
    
    const ctx=canvas.getContext('2d');

    draw();

    function draw() {        
        ctx.beginPath(); 
        ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
  
    function update(){
        
        ctx.clearRect(0,0,canvas_width,canvas_height);

        ball.x+=ball.dx;
        ball.y+=ball.dy;

        detectWalls();

        draw();

        
        animate=requestAnimationFrame(function(){
            update();
        });
    }
    

    function detectWalls(){
        if(ball.x+ball.dx>canvas_width || ball.x+ball.dx<0)
            ball.dx*=-1;
        if(ball.y+ball.dy>canvas_height || ball.y+ball.dy<0)
            ball.dy*=-1;
    }

    button.addEventListener('click',function(){
        if(!animate){
        update();
        }
    })
    
    reset.addEventListener('click',function(){
        cancelAnimationFrame(animate);
        ball.x=canvas_width/2;
        ball.y=canvas_height/2;
        animate=null;
        ctx.clearRect(0,0,canvas_width,canvas_height);
        draw();
    })

