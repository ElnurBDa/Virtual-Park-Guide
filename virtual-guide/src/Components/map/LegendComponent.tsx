import React, { useEffect } from "react";
import "ol/ol.css";
import { GeoJSON } from "ol/format";
import pointIcons from "./utils/pointIcons";
import { FaSquare } from "react-icons/fa";
import PolygonColors from "./utils/PolygonColors";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

interface G {
  geometry: string | undefined;
  type: string | undefined;
  name: string | undefined;
  color: string | undefined;
}

const LegendComponent: React.FC<{
  geojson: any;
}> = ({ geojson }) => {
  const [points, setPoints] = React.useState<G[]>([]);
  const [trails, setTrails] = React.useState<G[]>([]);
  const [areas, setAreas] = React.useState<G[]>([]);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    const geojsonFormat = new GeoJSON();
    const features = geojsonFormat.readFeatures(geojson);
    const types = features
      .filter((feature) => feature.get("type"))
      .map((feature) => {
        const geometry = feature.getGeometry()?.getType();
        const type = feature.get("type");
        const name = feature.get("name");
        const color =
          feature.get("color") ||
          (PolygonColors[type as keyof typeof PolygonColors]
            ? PolygonColors[type as keyof typeof PolygonColors].fill
            : undefined);
        return { geometry, type, name, color };
      })
      
    const points = types.filter((type) => type.geometry === "Point").filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.type === value.type && t.geometry === value.geometry
        )
    );;
    const trails = types.filter((type) => type.geometry === "LineString");
    const areas = types.filter((type) => type.geometry === "Polygon");
    
    setPoints(points);
    setTrails(trails);
    setAreas(areas);
  }, [geojson]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 0.5,
        fontFamily: "Arial, sans-serif",
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 1,
        transition: "width 0.3s, height 0.3s",
        width: expanded ? "300px" : "40px",
        height: expanded ? "auto" : "40px",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={() => setExpanded(!expanded)}
        sx={{ position: "absolute", right: 0, top: 0 }}
      >
        <InfoIcon sx={{
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s",
          color: expanded ? "green" : "gray",
          width: 30,
          height: 30,
        }}/>
      </IconButton>

      {expanded && (
        <>
          <Typography variant="h6" gutterBottom>
            Legend
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Points</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {points.map((point) => (
                <Box
                  key={point.type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Box sx={{ marginRight: 1 }}>
                    {pointIcons[point.type as keyof typeof pointIcons]}
                  </Box>
                  <Typography>{point.type}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Trails</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {trails.map((trail) => (
                <Box
                  key={trail.type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <FaSquare
                    size={20}
                    color={trail.color}
                    style={{ marginRight: 10 }}
                  />
                  <Typography>
                    {trail.type} - {trail.name}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Areas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {areas.map((area) => (
                <Box
                  key={area.type}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <FaSquare
                    size={20}
                    color={area.color}
                    style={{ marginRight: 10 }}
                  />
                  <Typography>
                    {area.type} - {area.name}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Paper>
  );
};

export default LegendComponent;
