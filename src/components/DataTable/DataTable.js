import React,{Component} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography,Button} from "@material-ui/core";
import FirebaseService from '../../services/FirebaseService'
import {urls,privateUrls} from "../../config/urls";
import {Link} from "react-router-dom";






export class DataTable extends Component {
    state = {
        data: []
    }
    remove = (id) => {
        FirebaseService.deleteCollection(id)
        this.props.history.push(urls.data.path);
        this.loadDocuments()
    }
    loadDocuments = () => {
        const data = []
        FirebaseService.getCollection()
        .then(resolve=>{
          resolve.forEach(doc => {
            doc.exists && data.push({key: doc.id, ...doc.data()})
          })
        }).then(()=>{
          this.setState({
            data
          })
          console.log(this.state)
        }) 
    }
    componentDidMount = () => {
        this.loadDocuments()
    }
     componentWillUnmount = () =>{
        this.setState({data:[]})
    }
    
      render(){
        const {data} = this.state
          return (
            <React.Fragment>
            <Typography variant="h5" component="h2">
               Add New
            </Typography>
            <Table selectable="false">
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Humidity</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>{item.key}</TableCell>
                                <TableCell>
                                    {item.temperatura}
                                </TableCell>
                                <TableCell>{item.umidade}</TableCell>
                                <TableCell>{item.cliente}</TableCell>
                                <TableCell>{item.data}</TableCell>
                                <TableCell>
                                        <Button
                                           onClick={() => this.remove(item.key)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                    <Button component={props => 
        <Link to={privateUrls.edit.pathWithouParam + item.key}    
                 {...props}/>}>
            Edit
        </Button>
                                    </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </React.Fragment>
          )
      }
}
