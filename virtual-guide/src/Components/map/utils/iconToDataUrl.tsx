import { renderToStaticMarkup } from "react-dom/server";

export const iconToDataUrl = (icon: JSX.Element) => {
    const svgString = encodeURIComponent(renderToStaticMarkup(icon));
    return `data:image/svg+xml,${svgString}`;
  };