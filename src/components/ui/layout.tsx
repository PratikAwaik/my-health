import { useAuthContext } from "@/hooks/use-auth-context";
import { Navbar } from "../navbar";
import { Sidebar } from "../sidebar";
import { useGetPatientDetails } from "@/services/patient/patient.data";
import { Spinner } from "./spinner";
import { Button } from "./button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { handleLogout } = useAuthContext();
  const { patient, isLoading: isPatientLoading } = useGetPatientDetails();

  if (isPatientLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-y-4 items-center">
          <p className="text-3xl font-semibold">Patient data not found!</p>
          <Button onClick={handleLogout} className="w-fit">
            Sign In Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen overflow-auto p-6 bg-primary/20">
      <div className="grid grid-rows-[auto_1fr] h-full gap-y-4">
        <Navbar patient={patient} />
        <div className="grid grid-cols-[15rem_2fr] gap-4 h-full">
          <Sidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
