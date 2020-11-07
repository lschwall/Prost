import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel, MenuItem, FormControl, FormHelperText, Grid, Typography, Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Select from '@material-ui/core/Select';
import axios from 'axios';
import Menu from './Menu.jsx';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Translate({ setView, customerId }) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [menus, setMenus] = useState(null);
  const [order, setOrder] = useState({});
  const [displayOrder, setDisplayOrder] = useState('');

  const translateOrder = () =>{
    const newOrder = [];
    for(let key in order){
      if(order[key]){
        newOrder.push(key);
      }
    }
    const orderStr = `I would like to order ${newOrder.join(',')} please`;
    axios.get(`/api/translate`, {
      params: {
        text: orderStr,
        target: 'es' 
      }
    })
    .then(({data}) => setDisplayOrder(data[0]))
    .catch((err) => console.warn(err));
  }
  const clearOrder = () =>{
    setOrder({});
  }

  const getMenu = (id) => {
    console.info('getMenu', id);
    axios.get(`/db/menu/bar/${id}`)
      .then(({ data }) => (data.length > 0 ? setMenus(data[0].info.split('&')) : setMenus(null)))
      .catch((err) => console.warn(err));
  };

  const handleChange = (event) => {
    console.info('event.target', event.target);
    console.info('list', list);
    getMenu(event.target.value);
  };
  useEffect(() => {
    axios.get('/db/menu/allbars')
      .then(({ data }) => setList(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <Grid>
      <Grid>
        <ArrowBackIosIcon color="primary" onClick={() => setView('Home')} />
      </Grid>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Bars</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="bar"
          onChange={handleChange}
        >
          {list.map((barObj, key) => <MenuItem key={key} value={barObj.id}>{barObj.bar_name}</MenuItem>)}
        </Select>
      </FormControl>
      <Grid>
        Menu
        {menus && menus.map((menuStr, key) => <Menu order={order} menuStr={menuStr} key={key} />)}
      </Grid>
      <Grid>
        <Button onClick={clearOrder} variant="outlined" color="secondary">Clear Order</Button>
        <Button onClick={translateOrder} variant="contained" color="primary">Translate Order</Button>
      </Grid>
      {displayOrder && <Grid>
        <p>{displayOrder}</p>
      </Grid>}
    </Grid>
  );
}
