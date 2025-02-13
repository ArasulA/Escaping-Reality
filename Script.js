class gun{
    constructor(){
      this.obj = document.createElement("a-sphere");
      this.obj.setAttribute("radius",0.5)
      let pos = camera.object3D.position;
      this.obj.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
      scene.append(this.obj);
      
      let theta = camera.object3D.rotation.y + Math.PI;
      let phi = camera.object3D.rotation.x;
      let v = 0.1
      let v_xz = v * Math.cos(phi);
      this.dz = v_xz * Math.cos(theta);
      this.dx = v_xz * Math.sin(theta);
      this.dy = v * Math.sin(phi);
    }
    fly(){
  
      this.obj.object3D.position.x += this.dx;
      this.obj.object3D.position.y += this.dy;
      this.obj.object3D.position.z += this.dz; 
  
      //this.obj.object3D.rotation.y = this.theta - Math.PI/2;
    }
  }
  let scene, camera, gun;
  window.onload = function(){
    scene = document.querySelector("a-scene");
    camera = document.querySelector("a-camera");
  
    window.onclick = ()=>{
      gun = new gun();
    } 
    loop();
  }
  
  function loop(){
    if(gun) gun.fly();
    window.requestAnimationFrame(loop);
  }


  class Ball{
    constructor(){
      this.obj = document.createElement("a-sphere");
      this.obj.setAttribute("radius",0.5)
      this.fire = false;
      scene.append(this.obj);
    }
    shoot(source, target){
      let angle = this.angleTo(source,target)
      
      let pos = source.object3D.position;
      this.obj.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
      
      let v = 0.02; //Strength of the vector
      let v_xz = v * Math.cos(angle.phi); //Vector projected on the x-z plane
      this.dz = v_xz * Math.cos(angle.theta);
      this.dx = v_xz * Math.sin(angle.theta);
      this.dy = v * Math.sin(angle.phi);
      this.fire = true;
    }
    angleTo(source,target){
      let d = distance(source,target)
      let dx = target.object3D.position.x - source.object3D.position.x;
      let dy = target.object3D.position.y - source.object3D.position.y;
      let dz = target.object3D.position.z - source.object3D.position.z;
  
      let theta = Math.atan(dx/dz) //Sideways angle
      if(dz < 0){
          theta += Math.PI
      }
      let phi = Math.asin(dy/d); //Up down angle
      
      return {theta:theta,phi:phi};
    }
    move(){
      if(this.fire){
        this.obj.object3D.position.x += this.dx;
        this.obj.object3D.position.y += this.dy;
        this.obj.object3D.position.z += this.dz;
      }
    }
  }
  let scene, camera, ball1, ball2, ball3, ball4;
  window.onload = function(){
    scene = document.querySelector("a-scene");
    camera = document.querySelector("a-camera");
  
    ball1 = new Ball()
    ball2 = new Ball()
    ball3 = new Ball()
    ball4 = new Ball()
    
    window.onclick = ()=>{
      ball1.shoot(box,camera);
      ball2.shoot(camera,cylinder);
      ball3.shoot(cylinder,sphere);
      ball4.shoot(sphere,box);
    } 
    loop();
  }
  
  function loop(){
    ball1.move();
    ball2.move();
    ball3.move();
    ball4.move();
    window.requestAnimationFrame(loop);
  }
  
  function distance(obj1, obj2) {
    let x1 = obj1.object3D.position.x;
    let y1 = obj1.object3D.position.y;
    let z1 = obj1.object3D.position.z;
    let x2 = obj2.object3D.position.x;
    let y2 = obj2.object3D.position.y;
    let z2 = obj2.object3D.position.z;
  
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
    return d;
  }
  






















































































































