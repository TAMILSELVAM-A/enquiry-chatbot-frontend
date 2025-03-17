import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Box } from "@mui/material";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import SearchBox from "./SearchBox";

const Navbar = ({ setMenuOpen }) => {
  return (
    <AppBar position="sticky" sx={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </IconButton>
          <img
            src="https://img.freepik.com/premium-vector/phone-shop-outline-commerce-logo-vector-icon-illustration_125355-405.jpg?w=900"
            alt="Logo"
            style={{ height: 40, marginRight: 16, borderRadius: "8px" }}
          />
        </Box>
        <SearchBox />
        <IconButton>
          <Badge badgeContent={4} color="primary">
            <FaShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
