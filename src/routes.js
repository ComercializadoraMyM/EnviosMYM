import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/clients/ClientsListView';
import AddGuiaView from 'src/views/addGuia/AddGuiaView';
import AddEnviosView from 'src/views/addEnvios/AddEnviosView';
import DashListView from 'src/views/guides/GuidesListView';
import TrackingListView from 'src/views/tracking/TrackingListView';
import EnviosView from 'src/views/enviosView/enviosView';
import UserView from 'src/views/user/UserListView/UserView';
import Login from 'src/views/Login';
import PrivateRoute from './components/PrivateRoute';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <PrivateRoute component={AccountView} />},
      { path: 'clients-view', element: <PrivateRoute component={CustomerListView} /> },
      { path: 'add-guia', element: <PrivateRoute component={AddGuiaView} /> },
      { path: 'add-envios', element: <PrivateRoute component={AddEnviosView} /> },
      { path: 'guides-view', element: <PrivateRoute component={DashListView} /> },
      { path: 'tracking-view', element: <PrivateRoute component={TrackingListView} /> },
      { path: 'envios-view', element: <PrivateRoute component={EnviosView} /> },
      { path: 'user-view', element: <PrivateRoute component={UserView} /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: '/', element: <Login /> }
    ]
  }
];

export default routes;
