import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Store } from './store/store';
import { BriefProfiles } from './utils/brief_profiles';
import { SideMenuContextProvider } from './shared/layoutContainers/menu';

declare global {
  interface Window {
    RUNTIME_CONFIGURATION: { [key: string]: string };
  }
}

window.console.info(
  'Woogles.io is open source! https://github.com/domino14/liwords'
);

// Scope the variables declared here.
{
  // Adjust this constant accordingly.
  const minimumViableWidth = 568;
  const idealMobileWidth = 375;
  const metaViewport = document.querySelector("meta[name='viewport']");
  if (!metaViewport) {
    // Should not happen because this is in public/index.html.
    throw new Error('missing meta');
  }
  const resizeFunc = () => {
    let desiredViewport = 'width=device-width, initial-scale=1';
    const deviceWidth = window.outerWidth;
    if (deviceWidth < minimumViableWidth) {
      desiredViewport = `width=${idealMobileWidth}, initial-scale=${
        deviceWidth / idealMobileWidth
      }`;
    }
    metaViewport.setAttribute('content', desiredViewport);
  };
  window.addEventListener('resize', resizeFunc);
  resizeFunc();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Store>
        <BriefProfiles>
          <App />
        </BriefProfiles>
      </Store>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
