import Scene from "./three/Scene";
import Background from "./assets/images/bg.png";

function App() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className={"background"}
      ></div>
      <Scene />;
    </>
  );
}

export default App;
