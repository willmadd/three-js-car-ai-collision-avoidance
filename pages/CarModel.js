import React, { forwardRef } from 'react'
const CarModel = forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props}>
        <mesh>
            <boxGeometry args={[1,0.3,2]}/>
            <meshStandardMaterial color={props.colour}/>
        </mesh>
        <mesh position={[0,-0.2, 0.5]}>
            <boxGeometry args={[1.1,0.3,0.3]}/>
            <meshStandardMaterial color={'#333333'}/>
        </mesh>
        <mesh position={[0,-0.2, -0.5]}>
            <boxGeometry args={[1.1,0.3,0.3]}/>
            <meshStandardMaterial color={'#333333'}/>
        </mesh>
        <mesh position={[0,0.3,-0.2]}>
            <boxGeometry args={[0.8,0.3,1]}/>
            <meshStandardMaterial color={props.colour}/>
        </mesh>
    </group>
  )
});

export default CarModel