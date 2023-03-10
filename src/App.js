import './App.css';
import '../src/modules/DetailedOrder';
import { Layout, Image } from 'antd';
import SideMenu from './components/SideMenu';
import AppRoutes from './components/Routes';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import RestaurantContextProvider from './contexts/RestaurantContext';

const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig);

function App() {
  return (
    <RestaurantContextProvider>
      <Layout>
      <Sider style={{ height: '100vh', backgroundColor: 'white' }}>
        <Image src='https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg'
          preview={false}
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Uber Eats Dashboard @2022
        </Footer>
      </Layout>
    </Layout>
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App);
