import { Navigate, Route, Routes } from 'react-router-dom'

import { appRoutes } from '../../config/appPageRoutes'

export default function AppRoutes() {
  return (
    <Routes>
      {appRoutes.map(({ page, path, component: PageComponent }) => (
        <Route
          key={page}
          path={path}
          element={<PageComponent />}
        />
      ))}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  )
}
