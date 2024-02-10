import * as React from 'react'
import { Provider } from 'jotai'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import CellEFP from './views/CellEFP'
import DebugView from './views/DebugView'
import ExperimentEFP from './views/ExperimentEFP'
import FallbackView from './views/FallbackView'
import GeneInfoView from './views/GeneInfoView'
import GetStartedView from './views/GetStartedView'
import PlantEFP from './views/PlantEFP'
import PublicationViewer from './views/PublicationViewer'
import { Config, EplantConfig } from './config'
import Eplant from './Eplant'

// Views that aren't associated with individual genes
const genericViews = [GetStartedView, FallbackView]

// List of views that a user can select from
// Can contain views from the genericViews list too
const userViews = [
  GeneInfoView,
  PublicationViewer,
  DebugView,
  PlantEFP,
  CellEFP,
  ExperimentEFP,
]

// List of views that are used to lookup a view by id
const views = [...genericViews, ...userViews]

const tabHeight = 48

export const defaultConfig: EplantConfig = {
  genericViews,
  userViews,
  views,
  rootPath: import.meta.env.BASE_URL,

  defaultSpecies: 'Arabidopsis',
  defaultView: 'get-started',
}
function RootApp() {
  return (
    <React.StrictMode>
      <Provider>
        <BrowserRouter>
          <Config.Provider value={defaultConfig}>
            <Eplant />
          </Config.Provider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RootApp />
)

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        import.meta.env.BASE_URL + '/sw.js'
      )
      if (registration.installing) {
        // console.log('Service worker installing')
      } else if (registration.waiting) {
        // console.log('Service worker installed')
      } else if (registration.active) {
        // console.log('Service worker active')
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}

registerServiceWorker()
