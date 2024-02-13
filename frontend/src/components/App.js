import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  // You can implement additional logic here if needed

  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          {/* Route for the Login page */}
          <Route path="/login" component={Login} />

          {/* Protected routes for the Dashboard and AdminDashboard */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/admin" component={AdminDashboard} />

          {/* Default route, redirect to login if no match */}
          <Redirect to="/login" />
        </Switch>
      </ErrorBoundary>
    </Router>
  );
};

// PrivateRoute component to protect routes (requires authentication)
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Your authentication check, e.g., check for a token
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          // Redirect to login if not authenticated
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;
