// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AdminNavbar from './AdminNavbar';


// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showSidebar, setShowSidebar] = useState(true);

//   // Mock data
//   const stats = {
//     totalBookings: 156,
//     totalUsers: 89,
//     totalRevenue: 45678,
//     recentBookings: [
//       { id: 1, user: 'John Doe', tour: 'Mountain Trek', date: '2024-03-15', status: 'Confirmed' },
//       { id: 2, user: 'Jane Smith', tour: 'Beach Paradise', date: '2024-03-16', status: 'Pending' }
//     ]
//   };

//   useEffect(() => {
//     // Check if admin is logged in
//     const adminToken = localStorage.getItem('adminToken');
//     if (!adminToken) {
//       navigate('/admin');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/admin');
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <>
//           <AdminNavbar/>
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Bookings</h3>
//                 <p className="text-3xl font-bold text-blue-900">{stats.totalBookings}</p>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
//                 <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
//                 <p className="text-3xl font-bold text-blue-900">${stats.totalRevenue}</p>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead>
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {stats.recentBookings.map((booking) => (
//                       <tr key={booking.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.tour}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                           }`}>
//                             {booking.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           </>
//         );
//       case 'tours':
       
//       case 'bookings':
//         return (
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Management</h2>
//             <p className="text-gray-600">Booking management interface will be implemented here.</p>
//           </div>
//         );
//       case 'users':
//         return (
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
//             <p className="text-gray-600">User management interface will be implemented here.</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className={`${showSidebar ? 'block' : 'hidden'} bg-blue-900 text-white w-64 min-h-screen`}>
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
//           <nav className="space-y-2">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`w-full px-4 py-2 text-left rounded-lg ${
//                 activeTab === 'overview' ? 'bg-blue-800' : 'hover:bg-blue-800'
//               }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('tours')}
//               className={`w-full px-4 py-2 text-left rounded-lg ${
//                 activeTab === 'tours' ? 'bg-blue-800' : 'hover:bg-blue-800'
//               }`}
//             >
//               Tours
//             </button>
//             <button
//               onClick={() => setActiveTab('bookings')}
//               className={`w-full px-4 py-2 text-left rounded-lg ${
//                 activeTab === 'bookings' ? 'bg-blue-800' : 'hover:bg-blue-800'
//               }`}
//             >
//               Bookings
//             </button>
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`w-full px-4 py-2 text-left rounded-lg ${
//                 activeTab === 'users' ? 'bg-blue-800' : 'hover:bg-blue-800'
//               }`}
//             >
//               Users
//             </button>
//           </nav>
//         </div>
//         <div className="absolute bottom-0 w-64 p-4">
//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="mb-8 flex justify-between items-center">
//           <button
//             onClick={() => setShowSidebar(!showSidebar)}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-200"
//           >
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h1>
//         </div>
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

const AdminDashboard = () => {
  const{logoutAdmin} = useContext(AuthContext);
  return (
    <>
    <div>admin dashboard</div>
    <button
            onClick={logoutAdmin}

            className="py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Logout
          </button>
    </>
  )
}

export default AdminDashboard