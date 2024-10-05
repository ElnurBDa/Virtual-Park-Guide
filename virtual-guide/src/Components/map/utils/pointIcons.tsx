import {
  FaInfoCircle,
  FaToilet,
  FaFlagCheckered,
  FaHome,
  FaBed,
  FaPaw,
  FaCampground,
  FaStar,
} from "react-icons/fa";

const size = 20;

const pointIcons = {
  entry: <FaFlagCheckered size={size} color="green" />,
  finish: <FaFlagCheckered size={size} color="red" />,
  attraction: <FaStar size={size} color="gold" />,
  rest: <FaBed size={size} color="blue" />,
  wildlife: <FaPaw size={size} color="brown" />,
  camp: <FaCampground size={size} color="orange" />,
  WC: <FaToilet size={size} color="purple" />,
  info_point: <FaInfoCircle size={size} color="yellow" />,
  administration: <FaHome size={size} color="black" />,
};

export default pointIcons;
