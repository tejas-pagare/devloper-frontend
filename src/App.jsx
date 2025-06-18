import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Membership from "./components/Membership";
import PurchaseSuccess from "./components/SuccessPurchase";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/membership" element={<Membership />} />
              <Route path="/purchase/success" element={<PurchaseSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
