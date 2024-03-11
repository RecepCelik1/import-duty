import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "./redux/fetchCountries";
import CountriesDropdown from "./components/countriesDropdown";
import ItemInfos from "./components/itemInfoInputs";

function App() {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getCountries())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="h-full min-h-screen w-full bg-gray-800 flex justify-center items-center">
        <div className="bg-gray-300 w-96 p-8 flex flex-col rounded-2xl"> {/* main container */}

            <div className="mt-4 mb-4">
              <div className="flex justify-center items-center w-full"><CountriesDropdown/></div>
              <div className="flex justify-center items-center mt-8 w-full"><ItemInfos/></div>
            </div>

        </div>
    </div>
  );
}

export default App;
