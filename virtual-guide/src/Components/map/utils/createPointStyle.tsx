import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { iconToDataUrl } from "./iconToDataUrl";

export const createPointStyle = (
    icon: JSX.Element,
    text: string,
    textColor: string,
    strokeColor: string,
    offsetY: number
  ) => {
    return new Style({
      image: new Icon({
        src: iconToDataUrl(icon),
        scale: 1,
      }),
      text: new Text({
        text: text,
        font: "14px Calibri,sans-serif",
        fill: new Fill({ color: textColor }),
        stroke: new Stroke({ color: strokeColor, width: 2 }),
        offsetY: offsetY,
      }),
    });
  };