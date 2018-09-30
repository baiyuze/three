//启动初始化

class Init3D {
  constructor() {
    this.initThree();
  }

  initThree() {
    let width = 60;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(width, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color('#eee', 1));
    //绘制区域
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //阴影支持
    this.renderer.shadowMapEnabled = true;
    //创建天空盒
    

  }
}

class start3d extends Init3D {
  constructor() {
    super();
    this.start();
  }

  start() {
    
  }

}


