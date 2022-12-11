import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBirthsList } from "./features/births/birthsSlice";
import { getCowsList } from "./features/cows/cowsSlice";
import { getProductionsList } from "./features/productions/productionsSlice";
import { getTestsList } from "./features/tests/testsSlice";
import Navbar from "./components/Navbar";
import Births from "./pages/births/Births";
import Cows from "./pages/cows/Cows";
import Productions from "./pages/productions/Productions";
import Tests from "./pages/tests/Tests";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBirthsList());
    dispatch(getCowsList());
    dispatch(getProductionsList());
    dispatch(getTestsList());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <div className="content">
          <Routes>
            <Route path="/" element={<Cows />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/births" element={<Births />} />
            <Route path="/productions" element={<Productions />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
