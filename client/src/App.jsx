import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import User from "./Router/User";
import Admin from "./Router/Admin";
import Partner from "./Router/Partner";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false}/> 
      <Router>
        {/* user side main Route set up */}
        <Suspense fallback={<h1 className="al">loading.......</h1>}>
          <Routes>
            <Route path="/*" element={<User />} />
          </Routes>
        </Suspense>

        {/*admin side main ROut set up*/}
        <Suspense fallback={<h1 className="al">loading......</h1>}>
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Suspense>

        {/*Partner side main Routes set up   */}
        <Suspense fallback={<h1 className="al">loading......</h1>}>
          <Routes>
            <Route path="/partner/*" element={<Partner />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
