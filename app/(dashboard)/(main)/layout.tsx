import Navbar from "@/components/dashboard/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
