import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const url = process.env.REACT_APP_VG_API;

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<
    { _id: string; name: string; description: string }[]
  >([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/parks/query?text=${searchText}`);
      setResults(response.data);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Park Search
      </Typography>
      <TextField
        label="Search Parks"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginTop: "16px" }}
      >
        Search
      </Button>
      <List>
        {results.map((result) => (
          <ListItem
            key={result._id}
            onClick={() => (window.location.href = `/park/${result._id}`)}
          >
            <ListItemText
              primary={result.name}
              secondary={result.description}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Search;
