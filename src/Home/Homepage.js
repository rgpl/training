import React from 'react';
import SideBar from './Sidebar';
import Footer from './Footer/Footer';
import Signup from '../Login/Signup';

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
  EuiButton
} from '@elastic/eui';

const color ="primary"
  
export default () => (
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
          <Signup />
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
            <EuiPageContentBody> 
                <EuiFlexGroup gutterSize="s" alignItems="center">
                    
                        <EuiFlexItem key={color} grow={false}>
                        <EuiButton verticalPosition="center" horizontalPosition="center"
                        onClick={() => window.alert('Button clicked')}
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