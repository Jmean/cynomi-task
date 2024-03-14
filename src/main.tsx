import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './components/error-page'
import ItemDetail from './routes/item-detail'
import NoteProvider from './components/note-provider'
import { ItemProvider } from './components/item-provider'
import { Header } from './components/header'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ItemProvider>
        <NoteProvider>
          <Header />
          <Root />
        </NoteProvider>
      </ItemProvider>
    ),
    errorElement: <ErrorPage />
  },
  {
    path:'item/:itemId',
    element: (
      <ItemProvider>
        <NoteProvider>
          <Header />
          <ItemDetail />
        </NoteProvider>
      </ItemProvider>
    ),
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
