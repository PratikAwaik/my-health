import { HeartPulse, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const { handleLogout } = useAuth();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-x-2 text-primary">
          <HeartPulse />
          My Health
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6 justify-between h-full">
        <div className="flex flex-col gap-y-2">
          <Link to="/medications">Medications</Link>
          <Link to="/vitals">Vitals</Link>
          <Link to="/lab-reports">Lab Reports</Link>
        </div>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="size-4" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
