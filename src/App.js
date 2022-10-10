import './App.css';
import { useEffect } from 'react';
import { ContextHolder } from '@frontegg/rest-api';
import { useAuth, useLoginWithRedirect, AdminPortal, useAuthActions } from "@frontegg/react";

function App() {
  const { switchTenant } = useAuthActions();
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
  loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  // useEffect(() => {
  //   let tenantIds;
  //   if (user) {
  //     tenantIds = user.tenantIds;
  //   }
  //   // if (!hasFetchedTenants.current) {
  //     setTenants(tenantIds);
  //     // hasFetchedTenants.current = true;
  //   // }
  // }, [tenants, user]);

  const handleClickAdminPortal = () => {
    AdminPortal.show();
  };

  const handleSwitchTenant = (e) => { 
    console.log(e.target.value);
    switchTenant(e.target.value);
  };

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <div className="App">
      { isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>What is my access token?</button>
          </div>
          <div>
            <button onClick={handleClickAdminPortal}>Admin Portal</button>
          </div>
          <select onChange={handleSwitchTenant}>
            <option value="Switch tenant">Switch tenant</option>
            {user.tenantIds.map((tenant) => <option value={tenant.value}>{tenant}</option>)}
          </select>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
