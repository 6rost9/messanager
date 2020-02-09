import React from 'react';
import './Home.css';
import withStore from './hoks/withStore';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Container, Box, TextField, IconButton } from '@material-ui/core';
import ChanelSelect from './components/chanelSelect';
import SelectedChanel from './components/selectedChanel';
import AllChanels from './components/allChanels';


class Home extends React.Component{
   render(){
      return <>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={`chat-item`}>
                  <ChanelSelect/>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={`chat-item`}>

                  <SelectedChanel/>

                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={`chat-item`}>
                  <AllChanels/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
   }
}


export default withStore(Home);
