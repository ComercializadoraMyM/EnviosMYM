import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/clients/ClientsListView';
import AddGuiaView from 'src/views/addGuia/AddGuiaView';
import DashListView from 'src/views/guides/GuidesListView';
import TrackingListView from 'src/views/tracking/TrackingListView';
import Login from 'src/views/Login';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'clients-view', element: <CustomerListView /> },
      { path: 'add-guia', element: <AddGuiaView /> },
      { path: 'guides-view', element: <DashListView /> },
      { path: 'tracking-view', element: <TrackingListView /> }
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
