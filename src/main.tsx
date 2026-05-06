import { StrictMode } from 'react' // рекомендуемая обертка, которая помогает находить потенциальные проблемы в React-приложении.
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Для маршрутизации
import './index.css'
import App from './App.tsx'
 // createRoot() — это функция, которая принимает HTML-элемент и возвращает объект React-корня.
 //А уже у этого объекта есть метод .render(). 

 
createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
