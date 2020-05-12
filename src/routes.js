import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Vegetables = React.lazy(() => import('./views/Vegetables/Vegetables'));
const Vegetable = React.lazy(() => import('./views/Vegetables/Vegetable'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/vegetables', name: 'Vegetables', component: Vegetables },
  { path: '/vegetables/:id', name: 'Vegetable', component: Vegetable }
];

export default routes;
