import { HeartPulse, LogOut, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

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
          <SidebarLink to="/medications">
            <Pill className="size-5" />
            Medications
          </SidebarLink>
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

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
}

const SidebarLink = ({ to, children }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  return (
    <Link
      to={to}
      className={cn(
        "p-2 rounded-md flex items-center gap-x-1.5",
        isActive && "bg-primary/20"
      )}
    >
      {children}
    </Link>
  );
};
