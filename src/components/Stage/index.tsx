/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import {
  useEffect, useRef, useState, Suspense,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF, OrbitControls, PerspectiveCamera, Environment,
  Html, useProgress,
} from '@react-three/drei';
import PropTypes from 'prop-types';
import { Object3D } from 'three';
import styles from './stage.module.css';
import splash from './img/splash_mobile.png';
import fruta01 from './img/esquerda_superior_02.png';
import fruta02 from './img/direita_superior.png';
import fruta03 from './img/direito_inferior_02.png';

// Componente de indicador de carregamento
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loader}>
        <div className={styles.loaderText}>
          Carregando:
          {' '}
          {progress.toFixed(0)}
          %
        </div>
        <div className={styles.loaderBar}>
          <div className={styles.loaderProgress} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Html>
  );
}
interface ModelProps {
  onLoaded: () => void;
}
function Model({ onLoaded }: ModelProps) {
  const { scene } = useGLTF('/ice.glb');
  const modelRef = useRef<Object3D>(null);
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = 20 * (Math.PI / 180);
      modelRef.current.rotation.z = 10 * (Math.PI / 180);
      // Agora avisamos que o modelo foi carregado e montado
      if (onLoaded) {
        onLoaded();
      }
    }
  }, [onLoaded]);
  return <primitive ref={modelRef} object={scene} scale={1} position={[0, 0, 0]} />;
}

Model.propTypes = {
  onLoaded: PropTypes.func.isRequired,
};

useGLTF.preload('/ice.glb');

function Stage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleModelLoaded = () => {
    setIsLoaded(true);
    // Adicionando um pequeno delay antes de mostrar o splash
    setTimeout(() => {
      setShowAnimation(true);
    }, 300);
  };

  const maxVerticalAngle = (115 * Math.PI) / 180;
  const minVerticalAngle = (30 * Math.PI) / 180;

  return (
    <div className={styles.stage}>
      {isLoaded && (
        <div className={styles.background}>
          {/* <div className={styles.splash} /> */}
          <figure className={`${styles.container_splash} ${showAnimation ? styles.animate_splash : ''}`}>
            <img className={styles.water_splash} loading="eager" src={splash} alt="Explosão de água" />
          </figure>
          <figure className={`${styles.container_fruits} ${showAnimation ? styles.animate_fruits : ''}`}>
            <img className={styles.fruta01} loading="eager" src={fruta01} alt="Imagem Fruta" />
            <img className={styles.fruta02} loading="eager" src={fruta02} alt="Imagem Fruta" />
            <img className={styles.fruta03} loading="eager" src={fruta03} alt="Imagem Fruta" />
          </figure>
          <div className={styles.fruits} />
          {/* <h1>NEW</h1>
          <h1>Gelato creamy and delicious</h1> */}
        </div>
      )}
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
          <spotLight position={[0, 5, 2]} intensity={1} angle={-0.3} penumbra={20} castShadow />
          <Environment preset="sunset" />
          <PerspectiveCamera makeDefault position={[0, 0.5, 1]} />
          <Model onLoaded={handleModelLoaded} />
          <OrbitControls
            minDistance={0.7}
            maxDistance={1}
            enableRotate
            rotateSpeed={0.5}
            minPolarAngle={minVerticalAngle}
            maxPolarAngle={maxVerticalAngle}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
export default Stage;
