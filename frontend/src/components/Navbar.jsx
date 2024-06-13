import React, { useEffect, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AuthContext } from "../App";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth, setAuth, refresh, setRefresh } = useContext(AuthContext);
  const navigator = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     console.log("Fetching data");
  //       const res = await fetch("https://blogapp-nnb7.onrender.com/api/user/auth", {
  //         method: "GET",
  //         headers: {
  //           token: localStorage.getItem("token")
  //         },
         
          
  //       });
  //       // console.log("The token string is :",token);
  //       console.log("The response is:",res)
  //         if(res.ok) {
  //         const data = await res.json();
  //         setAuth(data);
  //         setRefresh(false);
  //       }
  //       else
  //       {
  //         console.log("Data is not found")
  //         setAuth(null);
  //       }

  //     }
  //   fetchUser()
  // }, [auth, refresh])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //console.log("Fetching data");
        const res = await fetch("https://blogapp-nnb7.onrender.com/api/user/auth", {
  method: "GET",
  headers: {
    token: localStorage.getItem("token")
  },
});

if (res?.ok) {
  const data = await res.text(); // Read the response as text
  if (data) {
    const jsonData = JSON.parse(data);
    setAuth(jsonData);
    setRefresh(false);
  } else {
    console.log("Response body is empty");
    // Handle empty response as needed
  }
} else if (res.status === 401) {
  setAuth(null);
} else {
  console.error(`HTTP error! Status: ${res.status}`);
}

      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuth(null);
      }
    };
  
    fetchUser();
  }, [auth, refresh, setRefresh, setAuth]);
  

  const logOut = () => {
    localStorage.removeItem("token");
    //setAuth(null);
    setRefresh(true);
    navigator("/login");
  }

  return (
    <AppBar sx={{ p: "0 5%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <h3>Blogs</h3>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isNonMobileDevice ? (
            <>
              {auth ? (
                <>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/"}
                    >
                      Home
                    </Link>
                  </Button>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/create"}
                    >
                      Create
                    </Link>
                  </Button>
                  <Button color="inherit" onClick={logOut}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: "#fff" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {auth
                  ? [
                      <MenuItem key="home" onClick={handleClose}>
                        <Link
                          style={{ color: "#333", textDecoration: "none" }}
                          to={"/"}
                        >
                          Home
                        </Link>
                      </MenuItem>,
                      <MenuItem key="create" onClick={handleClose}>
                        <Link
                          style={{ color: "#333", textDecoration: "none" }}
                          to={"/create"}
                        >
                          Create
                        </Link>
                      </MenuItem>,
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          handleClose();
                          logOut();
                        }}
                      >
                        Logout
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="login" onClick={handleClose}>
                        <Link
                          style={{ color: "#333", textDecoration: "none" }}
                          to={"/login"}
                        >
                          Login
                        </Link>
                      </MenuItem>,
                      <MenuItem key="register" onClick={handleClose}>
                        <Link
                          style={{ color: "#333", textDecoration: "none" }}
                          to={"/register"}
                        >
                          Register
                        </Link>
                      </MenuItem>,
                    ]}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
