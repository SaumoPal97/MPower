import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorage } from "@/utils/storageUtils";
import logo from "@/assets/brand_assets/logo_transparent.png";

function Login() {
  const [number, setNumber] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <img src={logo} className="h-48 w-48" />
          <div className="flex flex-col w-full">
            <Input
              type="email"
              placeholder="Phone"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mb-2 w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              className="mb-2 w-full"
            />
          </div>
          <Button
            type="submit"
            onClick={() => {
              setLocalStorage("access_token", number);
              navigate("/");
            }}
          >
            Log In
          </Button>
          <p className="font-bold text-sm my-4">Or</p>
          <Button className="w-48" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
