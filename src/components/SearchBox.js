import React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "20px",
        background: "white",
        border: "2px solid transparent",
      }}
    >
      <InputBase placeholder="Search phones..." sx={{ ml: 1, flex: 1 }} />
      <IconButton>
        <FaSearch />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
