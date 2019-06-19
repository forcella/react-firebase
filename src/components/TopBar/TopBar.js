import React from "react";
import {urls} from "../../config/urls";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import {Link} from "react-router-dom";

const HomeLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to={urls.home.path} {...props} />
))

export const TopBar = () => 
<AppBar position="static">
    <Toolbar>
        <IconButton color="inherit" aria-label="Menu" 
                component={HomeLink}
            >
        <MenuIcon/>
        </IconButton>
        <Typography variant="h5" component="h5">
            My Awesome React App
        </Typography>
    </Toolbar>
</AppBar>