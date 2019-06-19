import React, {Component} from "react";

import './Add.css'
import {Button, TextField, Typography} from "@material-ui/core";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../config/urls";
import {withRouter} from "react-router-dom";

class Add extends Component {

    state = {id: null, temperatura: '', umidade: '', data: '', cliente: ''};

    componentWillMount = async () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
           FirebaseService.getDocument(id).then(doc => {
               doc.exists && this.setState({id,...doc.data()})
           })
        }

    }

    submit = (event) => {
        event.preventDefault();

        const {temperatura} = this.state;
        const {umidade} = this.state;
        const {data} = this.state;
        const {cliente} = this.state;

        let objToSubmit = {
            temperatura,
            umidade,
            data,
            cliente
        };

       this.props.match.params.id ?
       FirebaseService.updateDocument(this.state.id, objToSubmit) :
       FirebaseService.addCollection(objToSubmit) 
    

        this.props.history.push(urls.data.path);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (<React.Fragment>
            <Typography variant="h5" component="h2">Add New</Typography>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                           type="text"
                           value={this.state.temperatura }
                           label="Temperature"
                           required
                           onChange={this.handleChange('temperatura')}/>

                <TextField className="input-field"
                           type="text"
                           label="Humidity"
                           value={this.state.umidade}UPDATE
                           required
                           onChange={this.handleChange('umidade')}/>

                <TextField className="input-field"
                           type="text"
                           label="Date"
                           value={this.state.data}
                           required
                           onChange={this.handleChange('data')}/>

                <TextField className="input-field"
                           type="email"
                           label="Client"
                           value={this.state.cliente}
                           required
                           onChange={this.handleChange('cliente')}/>

                <Button type="submit"
                        style={{marginTop: '20px', display: 'inline-block'}}>
                        {
                            this.state.id ? 'UPDATE' : 'ADD'
                        }
                </Button>
            </form>
        </React.Fragment>)
    }
}

export default withRouter(Add);