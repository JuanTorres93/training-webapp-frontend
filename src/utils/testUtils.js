// Code extracted from https://redux.js.org/usage/writing-tests
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { setupStore } from '../app/store'

// renderWithProviders is used to test components that depend on redux state
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState).store,
    routes = ['/'], // Allows to pass a route to test routing
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>
      {/* MemoryRouter is used to test components that use the router */}
      {/* Can be used functions as useNavigate or useLocation */}
      <MemoryRouter
        initialEntries={routes}
        // Flags asked by warnings due to changes in future version of react-router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        {children}
      </MemoryRouter>
    </Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}