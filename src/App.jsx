import Sidebar from "./components/Sidebar";
import DataTable from "./components/DataTable";

export default function App() {
  return (
    <div className="flex min-h-screen h-full">
      <div className="w-auto">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <DataTable />
      </div>
    </div>
  );
}
