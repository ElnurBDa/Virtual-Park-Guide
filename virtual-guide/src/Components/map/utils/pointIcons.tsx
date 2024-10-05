import {
  FaInfoCircle,
  FaToilet,
  FaFlagCheckered,
  FaHome,
  FaBed,
  FaPaw,
  FaCampground,
  FaStar,
  FaCar,
  FaCarCrash,
  FaWalking,
} from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";

const size = 30;

const pointIcons = {
  entry: <FaFlagCheckered size={size} color="#00ee00" />,
  finish: <FaFlagCheckered size={size} color="#F44336" />,
  attraction: <FaStar size={size} color="#FFD700" />,
  rest: <FaBed size={size} color="#2196F3" />,
  wildlife: <FaPaw size={size} color="#A0522D" />,
  camp: <FaCampground size={size} color="#FFA500" />,
  WC: <FaToilet size={size} color="#BA55D3" />,
  info_point: <FaInfoCircle size={size} color="#FFFF00" />,
  administration: <FaHome size={size} color="#D2691E" />,
  parking: <FaCar size={size} color="#78909C" />,
  hotel: <FaBed size={size} color="#FF7043" />,
  nocar: <FaCarCrash size={size} color="#FF0000" />,
  boat: <FaSailboat size={size} color="#A0522D" />,
  walk: <FaWalking size={size} color="#66BB6A" />,
};

export default pointIcons;
