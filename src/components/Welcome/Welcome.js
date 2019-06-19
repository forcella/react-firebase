import React from "react"
import {urls} from "../../config/urls"
import {Button, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"

export const Welcome = () => {
    return (
        <React.Fragment>
            <Typography variant="h4"
                        component="h2"
                 >
                   Welcome
                 </Typography>
            {
                Object.values(urls).map((url, index) => {
                    return <Button raised="true"
                                   key={index} 
                                   component={ props => 
                                 <Link to={url.path} {...props}/>
                                   }
                            >
                        {url.name}
                    </Button>
                })
            }
        </React.Fragment>
    )
}