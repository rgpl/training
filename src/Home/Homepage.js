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

const color ="primary"

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
            <h1>Page title</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent verticalPosition="center" horizontalPosition="center" style={{marginBottom:100}}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2 className="text-center"> Sign Up </h2>
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

    <EuiFormRow
      label={
        <EuiToolTip content="Otherwise use an EuiToolTip around the label of the form row.">
          <span>
            Gender <EuiIcon type="questionInCircle" color="subdued" />
          </span>
        </EuiToolTip>
      }
      display="columnCompressed">
      <EuiSelect
        options={[
          { value: 'option_one', text: 'Male' },
          { value: 'option_two', text: 'Female' },
          { value: 'option_three', text: 'Special Gender' },
        ]}
        compressed
        value= { this.state.Gender }
        onChange={ this.GenderChange }
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
      <Footer />
    </EuiPageBody>
    
  </EuiPage>
  );
 }
}

export default Homepage;


