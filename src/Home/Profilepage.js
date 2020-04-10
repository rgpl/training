import React from 'react';
import SideBar from './Sidebar';
import Footer from './Footer/Footer';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Calendar } from 'react-big-calendar';
import moment from 'moment'
import CalendarPage from '../Calendar/CalendarPage';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiPanel,
  EuiIcon,
  EuiToolTip,
} from '@elastic/eui';
import { ThemeProvider } from '@elastic/eui';



const color ="primary"

class ProfilePage extends React.Component {
  
  constructor(props) {
      super(props);

      this.state = {
          UserName: '',
          Gender: '',
          authenticated: false,
          showErrors: false,
          gotoHomePage: false,
          gotoCalenderPage: false
      };
  }

  calendarPage = e => {
    this.setState({
      gotoCalenderPage:true,
    });
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

  SignupClick = e => {
    console.log("submit clicked")
      if(this.state.UserName !== "" && this.state.Gender !== "") {

          this.setState({
              showErrors: false
          });

          axios.get('http://localhost:4000/loginpage', {
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

  SubmitClick = e => {

      let code = e.keyCode || e.which;
      if(code === 13) {
          if(this.state.UserName !== "" && this.state.Gender  !== "") {
              this.SignupClick();
          }
      }
  }

  Homepage = e => {
    
    this.setState({
      gotoHomePage:true,
    });        
  }

  render() {
      if(this.state.authenticated){
          return <Redirect to='/' />
      }
      if(this.state.gotoCalenderPage){
        return  <Redirect to='/Calendar' />
      }

      let errors;

      if (this.state.showErrors) {
          errors = [
              "Username / Gender has to be Filled!!",
          ];
      }
      
      if(this.state.gotoHomePage){
        return  <Redirect to='/home' />
      }

  
return (
  <EuiPage>
    <SideBar />
    <EuiPageBody>
        <EuiPageContentBody> 
                    <EuiFlexGroup gutterSize="s" alignItems="center">
                        
                            <EuiFlexItem key={color} grow={false}>
                            <EuiButton 
                            onClick={
                              this.Homepage
                            }
                            iconType="arrowRight">                        
                            <h2 className="text-center"> SignOut </h2>
                            </EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
        </EuiPageContentBody>
    <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Unlock Testing</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>User ProfilePage</EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent verticalPosition="center" horizontalPosition="center" style={{marginBottom:100}}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2 className="text-center"> User Profile </h2>
            </EuiTitle>
            <EuiPanel style={{ maxWidth: 300 }}>
    <EuiFormRow
      label="UserName"
      helpText="Show validation help text only."
      display="columnCompressed">
      <EuiFieldText name="first" compressed 
      value= { this.state.UserName }
      onChange={ this.UserNameChange }
      />
    </EuiFormRow>

    
  </EuiPanel>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
            <EuiPageContentBody> 
                <EuiFlexGroup gutterSize="s" alignItems="center">
                    
                        <EuiFlexItem key={color} grow={false}>
                        <EuiButton 
                        onClick={
                          this.SignupClick
                        }
                        iconType="arrowRight">                        
                        <h2 className="text-center"> Submit </h2>
                        </EuiButton>
                        </EuiFlexItem>
                    
  </EuiFlexGroup></EuiPageContentBody>
      </EuiPageContent>
      <EuiButton 
                            onClick={
                              this.calendarPage
                            }
                            iconType="arrowRight">                        
                            <h2 className="text-center"> Calendar </h2>
                            </EuiButton>
      <Footer />
    </EuiPageBody>
    
  </EuiPage>
  );
 }
}

export default ProfilePage;


