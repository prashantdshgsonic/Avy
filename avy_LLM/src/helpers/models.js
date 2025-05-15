import Char01 from "../gameElements/Char01";
import Char02 from "../gameElements/Char02";
import Char03 from "../gameElements/Char03";
import Char04 from "../gameElements/Char04";
import Char05 from "../gameElements/Char05";
import Char06 from "../gameElements/Char06";
import Char07 from "../gameElements/Char07";
import Char08 from "../gameElements/Char08";
import Char09 from "../gameElements/Char09";
import Char10 from "../gameElements/Char10";

const models = [
    {
      id: 1,
      avatar: <Char01 key="Char01" />
    },
    {
      id: 2,
      avatar: <Char02 key="Char02" />,
    },
    {
      id: 3,
      avatar: <Char03 key="Char03" />,
    },
    {
      id: 4,
      avatar: <Char04 key="Char04" />,
    },
    {
      id: 5,
      avatar: <Char05 key="Char05" />,
    },
    {
      id: 6,
      avatar: <Char06 key="Char06" />,
    },
    {
      id: 7,
      avatar: <Char07 key="Char07" />,
    },
    {
      id: 8,
      avatar: <Char08 key="Char08" />,
    },
    {
      id: 9,
      avatar: <Char09 key="Char09" />,
    },
    {
      id: 10,
      avatar: <Char10 key="Char10" />,
    },
  ];


export const getModelById = (id) => {
    const model = models.find(model => model.id === id);
    return model ? model.avatar : null;
  };

export const getAllModels = () => {
  return models;
};