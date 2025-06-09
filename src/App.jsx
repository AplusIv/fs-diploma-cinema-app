import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

// layouts
import RootLayout from "./layouts/admin/RootLayout"
import ClientRootLayout from "./layouts/client/ClientRootLayout"

// admin page
import Home from "./layouts/admin/Home"
import Login from "./layouts/admin/Login"
import NotFound from "./pages/NotFound"
import ShowError from "./pages/ShowError"

// client page
import Index from "./layouts/client/Index"
import BuyingCheck from "./layouts/client/BuyingCheck"
import PaymentCheck from "./layouts/client/PaymentCheck"
import TicketCheck from "./layouts/client/TicketCheck"

import BigSpinner from "./pages/BigSpinner"

// redux
import { Provider } from "react-redux"
import { store } from "./redux/store"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ShowError />}>
        {/* <Route path="/" element={<RootLayout />}> */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="client" element={<ClientRootLayout />}>
        <Route path="schedule/:date?" element={<Index />} />
        <Route path="buying" element={<BuyingCheck />} />
        <Route path="payment" element={<PaymentCheck />} />
        <Route path="ticket" element={<TicketCheck />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<BigSpinner />} />
    </Provider>
  )
}

export default App
