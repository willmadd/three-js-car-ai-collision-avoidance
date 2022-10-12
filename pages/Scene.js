import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import React, { useEffect, useMemo, useRef } from "react";
import { Model } from "../components/Island";
import * as YUKA from "yuka";
import { render, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CarModel from "./CarModel";
import { CubeReflectionMapping } from "three";
import LorryModel from "./LorryModel";

const Scene = () => {
  const vehicleRef = useRef(null);
  const lorryRef = useRef(null);
  const entityManager = new YUKA.EntityManager();

  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const boxRef4 = useRef(null);

  
  useEffect(() => {
    const box1 = new YUKA.GameEntity();

    box1.boundingRadius = new THREE.Box3().setFromObject(boxRef1.current).getBoundingSphere(new THREE.Sphere()).radius*0.5;
    box1.position.copy(boxRef1.current.position);
    entityManager.add(box1);
  
    const box2 = new YUKA.GameEntity();
    box2.boundingRadius  = new THREE.Box3().setFromObject(boxRef2.current).getBoundingSphere(new THREE.Sphere()).radius;
    box2.position.copy(boxRef2.current.position);
    entityManager.add(box2);
  
    const box3 = new YUKA.GameEntity();
    box3.boundingRadius  = new THREE.Box3().setFromObject(boxRef3.current).getBoundingSphere(new THREE.Sphere()).radius*1.2;
    box3.position.copy(boxRef3.current.position);
    entityManager.add(box3);
  
    const box4 = new YUKA.GameEntity();
    box4.boundingRadius  = new THREE.Box3().setFromObject(boxRef4.current).getBoundingSphere(new THREE.Sphere()).radius;
    box4.position.copy(boxRef4.current.position);
    entityManager.add(box4);

    const lorry = new YUKA.GameEntity();
    lorry.boundingRadius  = new THREE.Box3().setFromObject(lorryRef.current).getBoundingSphere(new THREE.Sphere()).radius*1.5;
    lorry.position.copy(lorryRef.current.position);
    entityManager.add(lorry);
  
    const obsticles = [box1,box2,box3,box4, lorry]
  
    const obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior(obsticles)
    vehicleRef.current.matrixAutoUpdate = false;
    const vehicleSphere = new THREE.Box3().setFromObject(vehicleRef.current).getBoundingSphere(new THREE.Sphere());

    const followPathBehaviour = new YUKA.FollowPathBehavior(path, 2.5);
    vehicle.boundingRadius = vehicleSphere.radius;
    vehicle.steering.add(followPathBehaviour);
    vehicle.steering.add(obstacleAvoidanceBehavior);
    vehicle.maxSpeed = 10;
    vehicle.mass=0.7
    vehicle.setRenderComponent(vehicleRef, sync);

  }, []);

  const sync = (entity, renderComponent) => {
    renderComponent.current.matrix.copy(entity.worldMatrix);
  };

  const vehicle = new YUKA.Vehicle();

  const path = new YUKA.Path();

  path.add(new YUKA.Vector3(-16, 0, 16));
  path.add(new YUKA.Vector3(-15, 0, -15));
  path.add(new YUKA.Vector3(-10, 0, -15));
  path.add(new YUKA.Vector3(-7, 0, 0));
  path.add(new YUKA.Vector3(0, 0, 0));
  path.add(new YUKA.Vector3(0, 0, -15));
  path.add(new YUKA.Vector3(15, 0, -12));
  path.add(new YUKA.Vector3(15, 0, -9));
  path.add(new YUKA.Vector3(11, 0, -5));
  path.add(new YUKA.Vector3(7, 0, -5));
  path.add(new YUKA.Vector3(5, 0, -3));
  path.add(new YUKA.Vector3(5, 0, 2));
  path.add(new YUKA.Vector3(10, 0, 5));
  path.add(new YUKA.Vector3(15, 0, 10));
  path.add(new YUKA.Vector3(15, 0, 15));
  path.add(new YUKA.Vector3(12, 0, 15));
  path.add(new YUKA.Vector3(7, 0,10));
  path.add(new YUKA.Vector3(-5, 0, 10));
  path.add(new YUKA.Vector3(-11, 0, 16));

  path.loop = true;

  vehicle.position.copy(path.current());

  entityManager.add(vehicle);

  const time = new YUKA.Time();

  const linePath = useMemo(() => {
    const bezCv = [];
    const pos = [];
    for (let i = 0; i < path._waypoints.length; i++) {
      const waypoint = path._waypoints[i];
      pos.push(waypoint.x, waypoint.y, waypoint.z);
      bezCv.push(new THREE.Vector3(waypoint.x, waypoint.y, waypoint.z));
    }
    return {cv:bezCv, path:pos};
  });


  const curve = new THREE.CatmullRomCurve3(linePath.cv);

   curve.closed = true
   curve.type = 'catmullrom';


  const points = curve.getPoints( 500 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  const material = new THREE.LineBasicMaterial( { color: 'yellow', lineWidth: 18 } );
  

  useFrame((state, delta) => {
    const d = time.update().getDelta();
    entityManager.update(d);
  });

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(linePath.path), 3)
  );


  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.5} />
      <pointLight position={[2, 4, 4]} intensity={2} castShadow />
      <lineLoop args={[lineGeo, material]} />
      {/* <lineLoop args={[geometry, material]} /> */}


      <PerspectiveCamera makeDefault position={[0, 40, 0]} />


      <CarModel ref={vehicleRef} colour={"purple"} />
      <LorryModel ref={lorryRef} colour={'darkblue'} rotation={[0, -Math.PI*0.5,0]} position={[-10,0, -9]}/>
      <mesh position={[-14, 1, -13]}   ref={boxRef1}>
        <cylinderGeometry args={[1, 1, 2, 10]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh position={[-14.5, 1, 14]} ref={boxRef2}>
        <cylinderGeometry args={[0.4, 0.4, 2]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
      <mesh position={[12, 1, -14]} ref={boxRef3}>
      <cylinderGeometry args={[1, 1, 2, 10]} />
        <meshStandardMaterial color={"yellow"} />
      </mesh>
      <mesh position={[13, 1, 13]} ref={boxRef4}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"tomato"} />
      </mesh>
      <mesh position={[8, 1, 0]}>
        <boxGeometry args={[2, 2, 5]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh position={[0, 1, 14]} >
        <boxGeometry args={[14, 2, 2]} />
        <meshStandardMaterial color={"lightblue"} />
      </mesh>
      {/* <mesh position={[-3.25, 1, -10]} >
        <boxGeometry args={[3, 2, 18]} />
        <meshStandardMaterial color={"lightblue"} />
      </mesh> */}
      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.4, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[40, 40]} />
        <meshStandardMaterial color={"#348C31"} />
      </mesh>
    </>
  );
};

export default Scene;
