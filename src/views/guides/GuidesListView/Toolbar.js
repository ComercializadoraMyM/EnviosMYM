import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  butStyle: {
    marginTop: '10px',
    background: '#eaecf9'
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [idIn, setIdIn] = React.useState (
    {
        id: {
            in: '',
        }
    }
  );

  const handleInput = (event) => {
    idIn[event.target.name][event.target.id] = event.target.value;
    setIdIn(idIn);
  };

  const URL = 'http://ec2-3-88-143-243.compute-1.amazonaws.com:3001/api/guia';

  const [guias, setGuias] = React.useState({
    "calculos": {},
    "destinatario": {}
  });

  const getDataSpecific = async (id) => {
    const response = await axios.get(`${URL}/${id}`)
    if (response.data.length > 0){
      setGuias(response.data[0])
    } else {
      setGuias({"calculos": {}, "destinatario": {}});
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Card>
          <CardContent>
            <Box maxWidth={400}>
              <TextField
                id="in"
                name="id"
                onChange={handleInput}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar guia"
                variant="outlined"
              />
              <Button 
                variant="outlined" 
                color="secondary" 
                className={classes.butStyle}
                onClick={() => {
                  handleClickOpen()
                  getDataSpecific(idIn.id.in)
                }}
              >
                Buscar Guia
              </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-track"
                aria-describedby="alert-track"
                width="200px"
            >
                <DialogTitle id="alert-track" className={classes.dialogstyle}>{"Detalle de la guia"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-track" className={classes.form}>
                      Flete: {guias.calculos.flete}
                      <br />
                      Seguro: {guias.destinatario.vlrSeguro}
                      <br />
                      Impuestos: {guias.calculos.impuesto}
                      <br />
                      Total: {guias.calculos.total}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={handleClose} 
                    variant="outlined" 
                    color="primary" 
                  >
                    Cerrar
                  </Button>
                </DialogActions>
            </Dialog>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
