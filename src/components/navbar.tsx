import { Clock } from "lucide-react";
import { useMemo } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

interface NavbarProps {
  patientName?: string;
}

export function Navbar({ patientName }: NavbarProps) {
  const nameInitials = useMemo(() => {
    if (patientName) {
      const split = patientName.split(" ");
      let initials = "";
      const [firstName, middleName, lastName] = split;
      if (firstName) initials += firstName.substring(0, 1);
      if (lastName) initials += lastName.substring(0, 1);
      else if (middleName) initials += middleName.substring(0, 1);
      return initials;
    }
  }, [patientName]);

  return (
    <Card>
      <CardHeader className="w-full flex flex-row items-center justify-between gap-x-4 flex-wrap px-4 py-3 space-y-0">
        <CardTitle>Welcome, {patientName?.split(" ")[0]}</CardTitle>
        <div className="flex items-center gap-x-4 mt-0">
          <div className="flex items-center gap-x-1 text-gray-500 text-sm">
            <Clock className="size-4" />
            <p>Session expires in: 0:00</p>
          </div>
          <Link to={"/profile"}>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
