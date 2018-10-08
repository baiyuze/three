var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

class Init {
  constructor() {
    //gui创建
    // this.createUi();
    //创建场景
    this.createScene();
    //创建灯光
    this.createLight();
    //创建飞机
    this.createPlane();
    //创建海洋
    this.createSea();
    //创建天空
    this.createSky();
    //循环
    this.loop();
  }

  //创建gui
  createUi() {
    //通过dat.gui来调整环境光
    var controls = new function () {//声明一个控制对象
      this.ambientLightColor = "#dc8874";
    }
    //环境光的值可以是16进制的数值，如"#ffffff"，每次通过gui调整了color值都会触发下面的匿名函数从而调整环境光的颜色，环境光加入到场景中后每次渲染场景时都会使用最新的环境光颜色值，从而实现了使用gui调整环境光颜色的功能
    var gui = new dat.GUI;//创建gui对象
    gui.addColor(controls, 'ambientLightColor').onChange((e) => {
      ambientLight.color = new THREE.Color(e);
    });
  }

  //创建场景
  createScene() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let fieldOfView = 60; //可视角度
    let aspectRatio = width/height; //可视窗口的纵横比，保证物体不会变形
    let nearPlane = 1; //近视距离
    let farPlane = 10000; //远视距离
    this.scene = new THREE.Scene();
    //创建一个有雾化效果的场景
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    //添加一个三维坐标系 
    // let axes = new THREE.AxisHelper(200);
    // this.scene.add(axes);

    //创建相机 透视相机
    this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane );
    //设置相机位置
    this.camera.position.x = 0;
    this.camera.position.y = 100;
    this.camera.position.z = 200;

    //渲染
    this.renderer = new THREE.WebGLRenderer({
      //允许透明显示渐变背景
      alpha: true,
      //抗锯齿
      antialias: true
    });
    //设置渲染的窗口范围
    this.renderer.setSize(width, height);
    //启用阴影渲染
    this.renderer.shadowMap.enabled = true;
    //渲染到页面
    let container = document.getElementById('world');
    container.appendChild(this.renderer.domElement);
    //如果更新了窗口大小，那么相机重新渲染
    window.addEventListener('resize', this.setWindowsSize.bind(this), false);

  }

  //重置窗口大小
  setWindowsSize() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    this.renderer.setSize(width, height);
    //相机纵横比
    this.camera.aspect = width / height;
    //更新投影矩阵
    this.camera.updateProjectionMatrix();
  }

  //创建灯光
  createLight() {
    //创建一个半球光源
    //第一个参数是天空颜色 第二个参数是地面颜色 第三个参数是光的强度
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9);
    //设置平行光
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    //设置光源位置
    this.shadowLight.position.set(150, 350, 350);
    //允许投射影子
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;
    // 定义阴影的分辨率;越高越好
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

    //添加到场景
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
  }

  //创建海洋
  createSea() {
    //创建一个圆柱模型
    //半径顶部，半径底部，高度，半径上的节段数，垂直的节段数
    this.geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    //在x轴上旋转几何体
    this.geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    //创建材质 表面光亮的材质
    this.mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true, //透明
      opacity: 0.6, //透明度
      shading: THREE.FlatShading, //平滑衰减
    });
    //创建一个网格
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //允许有阴影
    this.mesh.receiveShadow = true; 
    this.mesh.position.y = -600;
    //添加到场景
    this.scene.add(this.mesh);
    this.renderer.render(this.scene, this.camera);
  }

  //创建飞机 
  createPlane() {

  }

  //创建天空
  createSky() {

  }

  //循环
  loop() {
    // Rotate the propeller, the sea and the sky
    // airplane.propeller.rotation.x += 0.3;
    this.mesh.rotation.z += 0.005;
    // sky.mesh.rotation.z += .01;

    // render the scene
    this.renderer.render(this.scene, this.camera);

    // call the loop function again
    requestAnimationFrame(this.loop.bind(this));
  }

}





