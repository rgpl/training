import React from 'react';
import SideBar from './Sidebar';
import Footer from './Footer/Footer';
//import Signup from '../Login/Signup';
//import SideBar from './Sidebar';
import { Redirect} from 'react-router-dom';
import axios from 'axios';

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

const color = [
  'primary',
  'text',
  'subdued',
  'success',
  'warning',
  'danger',
  'disabled',
];

class Homepage extends React.Component {
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
                  authenticated:true
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

  render() {
      if(this.state.authenticated){
          return <Redirect to='/profile' />
      }

      let errors;

      if (this.state.showErrors) {
          errors = [
              "Username / Gender has to be Filled!!",
          ];
  }

  
return (
  <EuiPage>
    <SideBar />
    <EuiPageBody>
    
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Unlock Testing</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>Unlock HomePage</EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent verticalPosition="center" horizontalPosition="center" style={{marginBottom:100}}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2 className="text-center"> Welcome to Unlock Games </h2>
            </EuiTitle>
        </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
            <EuiPageContentBody> 
                <EuiFlexGroup gutterSize="s" alignItems="center">
                    
                        <EuiFlexItem key={color} grow={true}>
                        <EuiButton 
                          color= {color.success}
                          onClick={
                          this.SignupClick
                          }
                        iconType="arrowRight">                        
                        <h2 className="text-center"> SignUp </h2>
                        </EuiButton>
                        
                        
                        </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPageContentBody>
            <EuiPageContentBody> 
                <EuiFlexGroup gutterSize="s" alignItems="center">
                    
                  <EuiFlexItem key={color} grow={true}>
                      <EuiButton 
                      onClick={
                        this.SignupClick
                      }
                      iconType="arrowLeft">                        
                      <h2 className="text-center"> SignIn </h2>
                      </EuiButton>
                 </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPageContentBody>
      </EuiPageContent>
      <Footer />
    </EuiPageBody>
    
  </EuiPage>
  );
 }
}

export default Homepage;


