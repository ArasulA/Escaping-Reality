class Zombie{
    constructor(x,y,z,model){
      this.model = model;
      this.obj = document.createElement("a-gltf-model");
      this.obj.setAttribute("src",model.template);
      this.obj.setAttribute("animation-mixer",{clip:model.charge,timeScale:0});
      this.obj.setAttribute("scale",`${model.scale} ${model.scale} ${model.scale}`);
      this.obj.setAttribute("position",{x:x,y:y,z:z})
      this.obj.setAttribute("shadow",{receive: true});
      scene.append(this.obj);
    }
    angleTo(that){
        let dx = that.object3D.position.x - this.obj.object3D.position.x;
        let dz = that.object3D.position.z - this.obj.object3D.position.z;
  
        this.angle = Math.atan(dx/dz)
        if(dz < 0){
            this.angle += Math.PI
        }
    }
    rotateTowards(that){
        this.angleTo(that);
        this.obj.object3D.rotation.y = this.angle;
    }
    forward(){
        let dx = this.model.speed * Math.sin(this.angle);
        let dz = this.model.speed * Math.cos(this.angle);
        this.obj.object3D.position.x += dx;
        this.obj.object3D.position.z += dz; 
        this.obj.setAttribute("animation-mixer",{clip:this.model.charge, timeScale:0.75});
    }
    stop(){
      this.obj.setAttribute("animation-mixer",{timeScale:0});
    }
  }