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

class Loginpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: '',
            Gender: '',
            authenticated: false,
            showErrors: false
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

    render() {
        if(this.state.authenticated){
            return <Redirect to='/' />
        }

        let errors;

        if (this.state.showErrors) {
            errors = [
                "Username / Gender has to be Filled!!",
            ];
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
                        <EuiPageHeaderSection> Unlock Signup </EuiPageHeaderSection>
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
                                <EuiButton fill onClick={this.onLoginClick}>
                                    GO
                                </EuiButton>
                            </EuiFlexItem>
                        </EuiForm>

                    </EuiPageContentBody>
                </EuiPageContent>
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

export default Loginpage;
