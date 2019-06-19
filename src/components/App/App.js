import React, { Component } from 'react'
import {Route} from 'react-router-dom';


import './App.css'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import red from '@material-ui/core/colors/red'

import FirebaseService from '../../services/FirebaseService'
import {urls,privateUrls} from '../../config/urls'
import {TopBar} from '../TopBar/TopBar'
import {Welcome} from '../Welcome/Welcome'
import Add from '../Add/Add'

import {DataTable}from '../DataTable/DataTable'


const theme = createMuiTheme({
  palette: {
      primary: red,
  },
});



class App extends Component {
  state = {
    data: [],
    reload: false
}

// componentDidUpdate = () => {
//   console.log(this.state)
// }
// componentWillUpdate = () => {
//   const data = []
//   this.state.reload && FirebaseService.getCollection()
//   .then(resolve => {
//     resolve.forEach(doc => {
//      doc.exists && data.push({key: doc.id, ...doc.data()})
//     })
//   }).then(()=>{
//     this.setState({
//       data
//     })
//   }) 
// }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
       <TopBar />
        <Card style={{margin: '50px'}}>
        <CardContent>
          <Route exact
            path={urls.home.path}
            render={(props) => <Welcome {...props}/>}
          />

        <Route exact
          path={urls.data.path}
          render={(props) => 
            <DataTable {...props}/>}
        />

        <Route exact
          path={urls.add.path}
          render={(props) => 
            <Add {...props}/>}
        />
        <Route exact
       path={privateUrls.edit.path}
       render={(props) => <Add {...props} />}
/>
    </CardContent>
</Card>
     </MuiThemeProvider>
    )
  }
}

export default App;
