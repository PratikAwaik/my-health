import { Activity, FlaskConical, HeartPulse, LogOut, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/hooks/use-auth-context";

export function Sidebar() {
  const { handleLogout } = useAuthContext();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-x-2 text-primary">
          <HeartPulse />
          My Health
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6 justify-between h-full">
        <div className="flex flex-col gap-y-2">
          <SidebarLink to="/medications">
            <Pill className="size-5" />
            Medications
          </SidebarLink>
          <SidebarLink to="/vitals">
            <Activity className="size-5" />
            Vitals
          </SidebarLink>
          <SidebarLink to="/lab-reports">
            <FlaskConical className="size-5" />
            Lab Reports
          </SidebarLink>
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
        "p-2 pl-4 rounded-md flex items-center gap-x-1.5",
        isActive && "bg-primary/20 text-primary"
      )}
    >
      {children}
    </Link>
  );
};
