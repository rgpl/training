import React from 'react';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
    EuiFieldText,
    EuiFieldPassword,
    EuiSpacer,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiBottomBar,
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton,
    EuiForm,
    EuiFormRow,
  } from '@elastic/eui';
//import './login.css';
import { Redirect} from 'react-router-dom';
import axios from 'axios';

const color = [
    'primary',
    'text',
    'subdued',
    'success',
    'warning',
    'danger',
    'disabled',
  ];

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: '',
            Gender: '',
            authenticated: false,
            showErrors: false,
            gotoSignUpPage:false,
            gotoHomepage: false,
            gotoProfilePage: false,
        };
    }

    UserNameChange = e => {
        this.setState({
          UserName: e.target.value,
        });
    };

    GenderChange = e => {
        this.setState({
            Gender: e.target.value
        });
    }

    homePage = e => {

        this.setState({
          gotoHomepage:true,
        });  
      }
 
    LoginpageClick = e => {

        if(this.state.UserName !== "" && this.state.Gender !== "") {

            this.setState({
                showErrors: false
            });

            axios.get('http://localhost:3000/loginpage', {
                params: {
                Username: this.state.UserName,
                Gender: this.state.Gender
                }
            },{ withCredentials: true })
            .then( (response)=> {
                console.log("Signup-response->",response);
                if(response.data.success){
                    this.setState({
                        authenticated:false
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    authenticated:false
                });
            })
            .finally(() => {
                // always executed
            });
        } else {
            this.setState({
                showErrors: true
            });
        }
    }

    enterPressed = e => {

        let code = e.keyCode || e.which;
        if(code === 13) {
            if(this.state.UserName !== "" && this.state.Gender  !== "") {
                this.LoginpageClick();
            }
        }
    }

    signUpClick = e => {

        this.setState({
          gotoSignUpPage:true,
        });  
      }
    
    profilePage = e => {

        this.setState({
          gotoProfilePage:true,
        });  
      }

    render() {
        if(this.state.authenticated){
            return <Redirect to='/signin' />
        }
        if(this.state.gotoHomepage){
            return  <Redirect to='/home' />
          }
        if(this.state.gotoProfilePage){
            return  <Redirect to='/profile' />
          }  
        let errors;

        if (this.state.showErrors) {
            errors = [
                "Username / Gender has to be Filled!!",
            ];
        }

        if(this.state.gotoSignUpPage){
            return  <Redirect to='/signup' />
          }

        return (
            <EuiPage>
                <EuiPageBody>
                    <EuiPageHeader>
                        <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>Unlock</h1>
                        </EuiTitle>
                        </EuiPageHeaderSection>
                        <EuiPageHeaderSection> Unlock LoginPage </EuiPageHeaderSection>
                    </EuiPageHeader>
                    <EuiSpacer size="xxl"></EuiSpacer>
                <EuiPageContent verticalPosition="center" horizontalPosition="center">
                    <EuiPageContentHeader>
                    <EuiPageContentHeaderSection>
                        <EuiTitle>
                        <h2>Sign-In</h2>
                        </EuiTitle>
                    </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <EuiForm isInvalid={this.state.showErrors} error={errors}>
                            <EuiFormRow>
                                <EuiFieldText
                                placeholder="Username"
                                value={this.state.userName}
                                onChange={this.onNameChange}
                                icon="user"
                                aria-label="Use aria labels when no actual label is in use"
                                onKeyUp={this.enterPressed}
                                />
                            </EuiFormRow>

                            <EuiSpacer size="m"></EuiSpacer>

                            <EuiFormRow>
                                <EuiFieldPassword
                                placeholder="Gender"
                                value={this.state.Gender}
                                onChange={this.GenderChange}
                                aria-label="Use aria labels when no actual label is in use"
                                onKeyUp={this.enterPressed}
                                />
                            </EuiFormRow>

                            <EuiSpacer size="m"></EuiSpacer>
                            <EuiFlexItem grow={false}>
                                <EuiButton  onClick={
                                    this.profilePage
                                    }
                                    iconType="arrowRight">                        
                                    <h2 className="text-center"> Go </h2>
                                </EuiButton>
                            </EuiFlexItem>
                        </EuiForm>                    
                    </EuiPageContentBody>
                </EuiPageContent>
                <EuiPageContentBody> 
                               <EuiFlexGroup gutterSize="s" alignItems="right">
                                 <EuiFlexItem key={color} grow={false}>
                                        <EuiButton 
                                        onClick={
                                        this.signUpClick
                                        }
                                        iconType="arrowRight">                        
                                        <h2 className="text-center"> Signup </h2>
                                        </EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiPageContentBody>
                <EuiBottomBar>
                    <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>
                        <EuiFlexGroup gutterSize="s">
                            <EuiFlexItem grow={false}>
                            <EuiButton color="ghost" size="s" iconType="help">
                                Help
                            </EuiButton>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                            <EuiButton color="ghost" size="s" iconType="globe">
                                Sitemap
                            </EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    </EuiBottomBar>
                </EuiPageBody>
            </EuiPage>
        );

    }
}

export default LoginPage;
