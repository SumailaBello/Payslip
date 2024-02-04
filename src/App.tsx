import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Details from './pages/Details/Details';
import { useEffect } from 'react';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {
  // // Add or remove the "dark" class on the document body
  // const toggleLightTheme = (shouldAdd: boolean) => {
  //   document.body.classList.toggle('light', shouldAdd);
  // };

  // useEffect(() => {
  //   // Use matchMedia to check the user preference
  //   const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

  //   toggleLightTheme(prefersLight.matches);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersLight.addEventListener('change', (mediaQuery) => toggleLightTheme(mediaQuery.matches));
  // }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
