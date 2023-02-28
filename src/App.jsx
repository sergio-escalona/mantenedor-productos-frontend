import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-data-grid/lib/styles.css';
import { Provider } from 'react-redux';
import RenderRoutes from './routes/renderRoutes';
import theme from './theme';
import { AuthProvider } from './context';
import { Loading } from './components/UI';
import { store } from './state/store';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <AuthProvider>
          <ProSidebarProvider>
            <ChakraProvider theme={theme}>
              <Router>
                <RenderRoutes />
              </Router>
            </ChakraProvider>
          </ProSidebarProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </Provider>
    </Suspense>
  );
}

export default App;
