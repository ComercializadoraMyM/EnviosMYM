import React, { Component } from 'react';
import LoginForm from 'src/components/LoginForm';
import Page from 'src/components/Page';

export default class Login extends Component {

    render() {
        return (
            <Page title="Iniciar Sesion">
                <div>
                    <div
                    style={{
                        backgroundImage: `url("/static/images/fondo-login.png")`,
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                        height: "100vh"                    
                        }}>
                        <LoginForm history={this.props.history}/>
                    </div>  
                </div> 
            </Page>  
        );
    }
}