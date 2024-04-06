import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PaytmLogo } from "../components/PaytmLogo";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center">
      <div className="position absolute top-5"><PaytmLogo /></div>
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="adam@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                if (res.data.token) {
                  localStorage.setItem("token", res.data.token);
                  navigate("/dashboard");
                } else {
                  alert("Invalid credentials/Error while logging in");
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
