import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import './style/index.scss';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
