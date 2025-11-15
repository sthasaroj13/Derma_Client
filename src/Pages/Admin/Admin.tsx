// import useAppSelector from "../../Hooks/useAppSelector";

// const Admin = () => {
//   const { isAuthenticated, name } = useAppSelector((state) => state.auth);
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center px-6 py-20 text-center">
//         <h1 className="text-4xl md:text-6xl capitalize font-bold text-orange-600 mb-6">
//           {isAuthenticated
//             ? `Welcome to Derma AI Admin Dashboard ${name}`
//             : "Welcome to Derma AI"}
//         </h1>
//         <p className="text-orange-900 text-lg md:text-[16px] max-w-2xl">
//           Your AI-powered skin health companion. Detect, learn, and glow
//           confidently.
//         </p>
//       </div>
//     </>
//   );
// };

// export default Admin;

// src/Pages/Admin/Admin.tsx
import { useMemo, useState } from "react";
import useAppSelector from "../../Hooks/useAppSelector";
import {
  Users,
  Activity,
  Building2,
  Search,
  Menu,
  X,
  Shield,
  Download,
  UserPlus,
  Calendar,
  Clock,
  Dna,
} from "lucide-react";
import { useGetAllUsersQuery } from "../../query/server/TotalUser";
import { useGetAllactiveUsersQuery } from "../../query/server/ActiveUserTodaySlice";
import { useGetAllUserScanQuery } from "../../query/server/TotalScanSlice";
import { useGetMostPredictSkinQuery } from "../../query/server/MostPrdictSkin";
import { UserTable } from "../../Table/UserTable";
import { downloadPDF } from "../../Component/DownloadUserPdf";
import { useGetActivitiesUsersQuery } from "../../query/server/ActivitiesOfUsersSlice";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
}

const Admin = () => {
  const { isAuthenticated, name, is_admin } = useAppSelector(
    (state) => state.auth
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: totalUserApi } = useGetAllUsersQuery();

  const activeNonAdminUsers = totalUserApi?.users.filter(
    (el) => el.is_active === true && el.is_admin === false
  );
  const TotalCountUser = activeNonAdminUsers?.length ?? 0;

  const today = new Date();
  const todayYear = today.getUTCFullYear();
  const todayMonth = today.getUTCMonth(); // 0-based
  const todayDate = today.getUTCDate();

  const { data: activeTodayUser } = useGetAllactiveUsersQuery();
  const { data: scanUser } = useGetAllUserScanQuery();
  const filterActiveTodayUser = activeTodayUser?.users.filter((el) => {
    if (!el.is_active || el.is_admin) return false;

    const createdDate = new Date(el.created_at);
    return (
      createdDate.getUTCFullYear() === todayYear &&
      createdDate.getUTCMonth() === todayMonth &&
      createdDate.getUTCDate() === todayDate
    );
  });

  const totalcountactiveuser = filterActiveTodayUser?.length ?? 0;
  const totalScanUser = scanUser?.total_predictions;
  const { data: getMostPredictSkinApi } = useGetMostPredictSkinQuery();
  const mostpreditSkinName = getMostPredictSkinApi?.most_predicted_disease;
  const { data: activitiesUserApi } = useGetActivitiesUsersQuery(5);
  console.log("ac", activitiesUserApi);

  const tableData = useMemo(() => {
    if (!totalUserApi?.users) return [];
    let users = totalUserApi.users.filter((el) => el.is_admin === false);
    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch)
      );
    }

    return users;
  }, [totalUserApi, searchTerm]);

  const stats = {
    totalUsers: TotalCountUser,
    activeToday: totalcountactiveuser,
    totalScans: totalScanUser,
    most_predict: mostpreditSkinName,
  };

  // const activities: Activity[] = [
  //   {
  //     id: "1",
  //     user: "Saroj",
  //     action: "Uploaded new skin scan",
  //     time: "2 mins ago",
  //   },
  //   { id: "2", user: "Aasha", action: "Updated profile", time: "15 mins ago" },
  //   { id: "3", user: "Ramesh", action: "Logged in", time: "1 hour ago" },
  //   {
  //     id: "4",
  //     user: "Sita",
  //     action: "Completed diagnosis",
  //     time: "3 hours ago",
  //   },
  //   { id: "5", user: "Admin", action: "Blocked user", time: "5 hours ago" },
  // ];

  if (!isAuthenticated || !is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-orange-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">Admin access required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2
            className={`font-bold text-orange-600 text-xl ${
              !sidebarOpen && "hidden"
            }`}
          >
            Derma AI
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-orange-100 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Activity, label: "Dashboard", active: true },
            { icon: Users, label: "Users" },
            { icon: Building2, label: "Clinics" },
            { icon: Dna, label: "Most Predicted Disease" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                item.active
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <item.icon size={20} />
              <span className={`${!sidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-orange-600 capitalize">{name}</span>
          </h1>
          <p className="text-gray-600">
            Here's what's happening with Derma AI today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Users",
              value: stats.totalUsers,
              icon: Users,
              color: "bg-blue-500",
            },
            {
              label: "Active Today",
              value: stats.activeToday,
              icon: Activity,
              color: "bg-green-500",
            },
            {
              label: "Total Scans",
              value: stats.totalScans,
              icon: Calendar,
              color: "bg-purple-500",
            },
            {
              label: "Most Predicted Disease",
              value: `${stats.most_predict}`,
              icon: Dna,
              color: "bg-orange-500",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[20px] font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Users
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-orange-100 transition">
                  <UserPlus size={20} className="text-orange-600" />
                </button>
                <button className="p-2 rounded hover:bg-orange-100 transition">
                  <Download
                    size={20}
                    className="text-orange-600 cursor-pointer"
                    onClick={() => downloadPDF(tableData)}
                  />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <UserTable searchTerm={searchTerm} />
          </div>

          {/* Recent Activity + Quick Actions */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {activitiesUserApi?.activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {act.user}
                      </p>
                      <p className="text-xs text-gray-600">{act.action}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  <UserPlus size={18} />
                  Add New User
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  <Download size={18} />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
