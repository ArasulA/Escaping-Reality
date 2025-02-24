// Camera Lag Component
AFRAME.registerComponent('camera-lag', {
  schema: { speed: { type: 'number', default: 5 } },
  init: function() {
    this.camera = document.querySelector('#camera');
    this.cameraWrapper = document.querySelector('#cameraWrapper');
    this.targetPosition = new THREE.Vector3();
  },
  tick: function(time, timeDelta) {
    let cameraWorldPos = new THREE.Vector3();
    this.camera.object3D.getWorldPosition(cameraWorldPos);
    this.targetPosition.lerp(cameraWorldPos, timeDelta / (1000 / this.data.speed));
    this.cameraWrapper.object3D.position.copy(this.targetPosition);
  }
});

// Flashlight Lag Component
AFRAME.registerComponent('flashlight-lag', {
  schema: { speed: { type: 'number', default: 3 } },
  init: function() {
    this.flashlight = document.querySelector('#flashlight');
    this.targetRotation = new THREE.Quaternion();
  },
  tick: function(time, timeDelta) {
    let cameraObj = document.querySelector('#camera').object3D;
    this.targetRotation.slerp(cameraObj.quaternion, timeDelta / (1000 / this.data.speed));
    this.flashlight.object3D.quaternion.copy(this.targetRotation);
  }
});

// Jump Controls Component (updated to only modify y-coordinate)
AFRAME.registerComponent('jump-controls', {
  schema: {
    jumpVelocity: { type: 'number', default: 5 },
    gravity: { type: 'number', default: 9.8 }
  },
  init: function() {
    this.velocityY = 0;
    this.jumping = false;
    // Store the initial ground level (only y)
    let pos = this.el.getAttribute('position');
    this.groundY = pos.y || 0;
    // Listen for Space key to trigger the jump.
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && !this.jumping && !event.repeat) {
        this.velocityY = this.data.jumpVelocity;
        this.jumping = true;
      }
    });
  },
  tick: function(time, timeDelta) {
    const dt = Math.min(timeDelta / 1000, 0.05);
    let pos = this.el.getAttribute('position');
    let newY = pos.y;
    if (this.jumping || pos.y > this.groundY) {
      // Apply gravity to update the vertical velocity and calculate new y.
      this.velocityY -= this.data.gravity * dt;
      newY = pos.y + this.velocityY * dt;
      // Clamp newY to the ground level.
      if (newY <= this.groundY) {
        newY = this.groundY;
        this.jumping = false;
        this.velocityY = 0;
      }
    } else {
      newY = this.groundY;
    }
    // Only update the y coordinate; x and z remain controlled by WASD controls.
    this.el.setAttribute('position', { x: pos.x, y: newY, z: pos.z });
  }
});

// Apply lag components to elements
document.querySelector('#cameraWrapper').setAttribute('camera-lag', 'speed: 2');
document.querySelector('#flashlight').setAttribute('flashlight-lag', 'speed: 3');