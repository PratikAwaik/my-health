import { Clock, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { deleteCookie } from "@/utils/cookies";
import { COOKIE_KEYS } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "./ui/card";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
    deleteCookie(COOKIE_KEYS.PATIENT_ID);
    navigate("/sign-in");
  }, [navigate]);

  return (
    <Card>
      <CardHeader className="w-full flex flex-row items-center justify-between gap-x-4 flex-wrap px-4 py-3 space-y-0">
        <CardTitle>Patient Dashboard</CardTitle>
        <div className="flex items-center gap-x-4 mt-0">
          <div className="flex items-center gap-x-1 text-gray-500 text-sm">
            <Clock className="size-4" />
            <p>Session expires in: 0:00</p>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
