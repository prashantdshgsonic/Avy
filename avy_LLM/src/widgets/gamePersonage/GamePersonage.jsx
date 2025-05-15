import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Light from '../lightForModels/Light';
import s from './GamePersonage.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/slice/userActions";
import { getAllModels } from "../../helpers/models";


function GamePersonage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const models = getAllModels();
  
  const [currentModel, setCurrentModel] = useState(userInfo.avatarId);
  let currentAvatar = models.find(item => item.id === currentModel).avatar
  
  const handleClick = (model) => {
    setCurrentModel(model.id);
    let newData = {
      id: userInfo.id,
      avatarId: model.id,
      firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userJob: userInfo.userJob,
        userName: userInfo.userName,
        email: userInfo.email,
        userLinkedIn: userInfo.userLinkedIn,
        linkToImage: userInfo.linkToImage,
    };
    dispatch(updateUserInfo({newData, userToken}));
  }

  return (
    <div className={s.wrapper}>
      <div className={s.currentModel}>
        <div className={s.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="308"
            height="39"
            viewBox="0 0 308 39"
            fill="none"
          >
            <path
              d="M16.0001 0.5L4.45841 0.149093L9.92535 10.3199L16.0001 0.5ZM291 0.5L296.965 10.3872L302.545 0.278106L291 0.5ZM7.52373 3.92498C3.46047 6.57981 1.03521 9.24358 0.492462 11.9737C-0.0760899 14.8336 1.47634 17.3303 4.23188 19.4267C6.99031 21.5254 11.1639 23.4038 16.431 25.0919C21.7157 26.7857 28.1754 28.3108 35.562 29.6694C65.0947 35.1011 109.76 37.9265 154.309 38.0633C198.858 38.2001 243.386 35.6486 272.643 30.2955C279.961 28.9566 286.345 27.4386 291.545 25.7359C296.727 24.0394 300.814 22.1344 303.474 19.9833C306.149 17.8201 307.55 15.2468 306.84 12.3268C306.165 9.54885 303.634 6.79646 299.43 4.01489L298.327 5.6828C302.438 8.40339 304.409 10.7929 304.897 12.7995C305.35 14.6641 304.578 16.5181 302.216 18.4281C299.839 20.3501 296.027 22.164 290.923 23.8352C285.838 25.5002 279.549 26.9987 272.283 28.3282C243.205 33.6485 198.82 36.1999 154.316 36.0633C109.812 35.9267 65.2846 33.1024 35.9238 27.7024C28.587 26.353 22.2171 24.8462 17.0414 23.1873C11.8481 21.5228 7.9306 19.7277 5.44286 17.835C2.95222 15.9401 2.10338 14.1277 2.45407 12.3636C2.83057 10.4698 4.64506 8.19489 8.61768 5.59928L7.52373 3.92498Z"
              fill="#9EAAFA"
            />
          </svg>
        </div>
        <p className={s.characterTitle}>Current character</p>
        <Canvas
          camera={{ position: [0, 1, 2] }}
          style={{ width: "100%", height: "100%" }}
        >
          <OrbitControls enablePan={false} />
          <Light />
          <group position={[0, -1.5, 0]}>{ currentAvatar }</group>
        </Canvas>
      </div>
      <div className={s.listModels}>
        {models.map((model) => (
          <div
            key={model.id}
            className={s.model}
            onClick={() => handleClick(model)}
          >
            <Canvas
              key={model.id}
              camera={{ position: [0, 1, 2] }}
              style={{ width: "100%", height: "100%" }}
            >
              <OrbitControls enablePan={false} />
              <Light />
              <group position={[0, -1.5, 0]}>{model.avatar}</group>
            </Canvas>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePersonage;
