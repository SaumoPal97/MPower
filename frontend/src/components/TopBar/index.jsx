// import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clearLocalStorage } from "@/utils/storageUtils";
import { useNavigate } from "react-router-dom";

function TopBar() {
  // const [temperature, setTemperature] = useState(25);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTemperature(25);
  // }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b border-gray-300 mb-4">
      <div className="w-full flex flex-row justify-end items-end">
        <ul className="font-medium flex flex-row items-center pt-0 px-4 pb-4 md:space-x-8">
          {/* <li>
            <p className="block py-2 px-3 text-gray-900">
              Current Weather - {temperature} °C
            </p>
          </li> */}
          <li>
            <Button
              onClick={() => {
                clearLocalStorage();
                navigate("/login");
              }}
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopBar;
