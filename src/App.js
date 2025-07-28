import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AppRoutes from './AppRoutes';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemSize: 20,
          borderRadius: 0,
        },
      },
    }}
  >
 <Provider store={store}>
 <AppRoutes />
 </Provider>
 </ConfigProvider>
  );
}

export default App;
