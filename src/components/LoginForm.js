import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import { Grid, Input, InputLabel} from '@material-ui/core/';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 300,
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(2),
        height:'600px',
        top:'50%',
        left:'50%',
        textAlign:'center',
        position:'center',
    },
    button: {
        backgroundColor:'#000',
        color:'#FFF',
        margin: '20px'
    },
    image: {
        margin: '20px',
        borderRadius:'10px',
    },
    form: {
        margin: '20px',
    }, 
    letter: {
        color:'grey',
        size:'9px',
        marginTop: '20px',
        display: 'none'
    }
}));

export default function LoginForm(props) {
    const [logIn, setLogIn] = React.useState (
        {
            validation: {
                nombre: '',
                password: ''
            }
        }
    );

    const handleChangeLog = (event) => {
        logIn[event.target.name][event.target.id] = event.target.value;
        setLogIn(logIn);
    };

    const handleChangeLogIn = (event) => {
        if (logIn.validation.nombre === "Envios" && logIn.validation.password === "MYM2021"){
            window.location='/app/account';
        } else {
            window.location='/';
        }
    };

const classes = useStyles();
  
return (
    <div className={classes.root} >   
        <Paper className={classes.paper}>
            <Grid>
                <br />
                <br />
                <h1>Bienvenido</h1>
                <br />
                <br />
                <img src="/static/images/avatars/express.png" width='200' className={classes.image} alt='img login' />
                <br />
                <FormControl className={classes.form} >
                    <InputLabel htmlFor="user">Nombre de usuario</InputLabel>
                        <Input
                        id="nombre"
                        name="validation"
                        onChange={handleChangeLog}
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle/>
                            </InputAdornment>
                        }
                        />
                </FormControl>
                <FormControl className={classes.form}>
                    <InputLabel htmlFor="pwd" >Contraseña</InputLabel>
                        <Input
                        id="password"
                        name="validation"
                        onChange={handleChangeLog}
                        type="password"
                        startAdornment={
                            <InputAdornment position="start">
                            <VpnKeySharpIcon/>
                            </InputAdornment>
                        }/>
                        <h4 className={classes.letter} >
                            Datos incorrectos.
                        </h4>
                </FormControl>
                <div>
                   <Button 
                    variant="contained" 
                    className={ classes.button } 
                    disableElevation
                    onClick={handleChangeLogIn}
                    >
                        Ingresar
                    </Button>  
                </div>
            </Grid>
        </Paper>
    </div>
);
}