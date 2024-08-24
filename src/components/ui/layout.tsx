interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="w-screen h-screen overflow-auto p-6">{children}</main>
  );
}
