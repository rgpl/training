import React from 'react';
import SideBar from './Sidebar';
import Footer from './Footer/Footer';
import { Redirect} from 'react-router-dom';
//import Header from './Header/Header';

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

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        gotoSignInPage:false,
        gotoSignUpPage:false,
    };
}
  signUpClick = e => {

    this.setState({
      gotoSignUpPage:true,
    });  
  }

  signInClick = e => {
    
    this.setState({
      gotoSignInPage:true,
    });        
  }


render(){

  if(this.state.gotoSignInPage){
    return  <Redirect to='/signin' />
  }

  if(this.state.gotoSignUpPage){
    return  <Redirect to='/signup' />
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
                              this.signUpClick
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
                            this.signInClick
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

export default HomePage;
