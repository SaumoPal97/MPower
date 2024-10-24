import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorage } from "@/utils/storageUtils";
import logo from "@/assets/brand_assets/logo_transparent.png";
import { Textarea } from "@/components/ui/textarea";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Signup() {
  const educationLevels = [
    {
      id: 1,
      title: "None",
    },
    {
      id: 2,
      title: "Junior",
    },
    {
      id: 3,
      title: "Senior",
    },
    {
      id: 4,
      title: "Graduate",
    },
  ];
  const incomeLevels = [
    {
      id: 1,
      title: "Less than $1k",
    },
    {
      id: 2,
      title: "$1k - $5k",
    },
    {
      id: 3,
      title: "$5k - $10k",
    },
    {
      id: 4,
      title: "Greater than $10k",
    },
  ];

  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [educationLevel, setEducationLevel] = useState(null);
  const [elopen, setElopen] = useState(false);
  const [incomeLevel, setIncomeLevel] = useState(null);
  const [ilopen, setIlopen] = useState(false);
  const [skills, setSkills] = useState("");

  const navigate = useNavigate();

  const onSubmit = () => {
    setLocalStorage("access_token", number);
    setLocalStorage("user_name", name);
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <img src={logo} className="h-48 w-48" />
          <div className="flex flex-col w-72 items-center justify-center">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              className="mb-2"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Phone"
              value={number}
              className="mb-2"
              onChange={(e) => setNumber(e.target.value)}
            />
            <div className="w-full mb-2">
              <Popover open={elopen} onOpenChange={setElopen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {educationLevel
                      ? educationLevels.find(
                          (level) => level.id === educationLevel?.id
                        )?.title
                      : "Select education level..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No education level found.</CommandEmpty>
                      <CommandGroup>
                        {educationLevels.map((level) => (
                          <CommandItem
                            key={level.id}
                            value={level.title}
                            onSelect={() => {
                              setEducationLevel(level);
                              setElopen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                educationLevel?.id === level.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {level.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full mb-2">
              <Popover open={ilopen} onOpenChange={setIlopen} className="mb-2">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {incomeLevel
                      ? incomeLevels.find(
                          (level) => level.id === incomeLevel?.id
                        )?.title
                      : "Select income level..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No income level found.</CommandEmpty>
                      <CommandGroup>
                        {incomeLevels.map((level) => (
                          <CommandItem
                            key={level.id}
                            value={level.title}
                            onSelect={() => {
                              setIncomeLevel(level);
                              setElopen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                incomeLevel?.id === level.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {level.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-row w-full items-center mb-2">
              <Textarea
                value={skills}
                placeholder="Add your skillsets..."
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <Input type="password" placeholder="Password" className="mb-2" />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="mb-2"
            />
            <Button type="submit" onClick={onSubmit}>
              Sign Up
            </Button>
          </div>
          <p className="font-bold text-sm my-4">Or</p>
          <Button className="w-48" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
