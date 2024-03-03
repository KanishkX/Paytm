import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signin } from "./signin"
import { Signup } from "./signup"
import { Dashboard } from "./Dashboard"
import { SendMoney } from "./SignInComponents/SendMoney"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup />} ></Route>
          <Route path = "/signin" element = {<Signin />} ></Route>
          <Route path = "/dashboard" element = {<Dashboard />} ></Route>
          <Route path = "/send" element = {<SendMoney />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
