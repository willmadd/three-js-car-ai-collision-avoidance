import React, { forwardRef } from "react";
const LorryModel = forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props}>
      <mesh>
        <boxGeometry args={[1, 0.3, 4]} />
        <meshStandardMaterial color={props.colour} />
      </mesh>
      <mesh position={[0, -0.2, 1.5]}>
        <boxGeometry args={[1.1, 0.3, 0.3]} />
        <meshStandardMaterial color={"#333333"} />
      </mesh>
      <mesh position={[0, -0.2, -1.0]}>
        <boxGeometry args={[1.1, 0.3, 0.3]} />
        <meshStandardMaterial color={"#333333"} />
      </mesh>
      <mesh position={[0, -0.2, -1.5]}>
        <boxGeometry args={[1.1, 0.3, 0.3]} />
        <meshStandardMaterial color={"#333333"} />
      </mesh>
      <mesh position={[0, 0.5, -0.45]}>
        <boxGeometry args={[1, 0.7, 3.1]} />
        <meshStandardMaterial color={props.colour} />
      </mesh>

      <mesh position={[0, 0.5, 1.6]}>
        <boxGeometry args={[1, 0.7, 0.7]} />
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh position={[0, 0.6, 1.61]}>
        <boxGeometry args={[0.8, 0.25, 0.7]} />
        <meshStandardMaterial color={'#666666'} />
      </mesh>
    </group>
  );
});

export default LorryModel;
