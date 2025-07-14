
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [page, setPage] = useState(1);
//   const USERS_PER_PAGE = 5;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const me = await fetch('/api/me').then(res => res.json());
//         const allUsers = await fetch('/api/admin/users').then(res => res.json());
//         setCurrentUserId(me._id);
//         setUsers(allUsers);
//         setFilteredUsers(allUsers);
//       } catch {
//         toast.error('Failed to fetch users');
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let filtered = [...users];

//     if (roleFilter !== 'all') {
//       filtered = filtered.filter(user => user.role === roleFilter);
//     }

//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(user => user.status === statusFilter);
//     }

//     if (search) {
//       const term = search.toLowerCase();
//       filtered = filtered.filter(user =>
//         `${user.firstname || ''} ${user.lastname || ''}`.toLowerCase().includes(term) ||
//         user.email.toLowerCase().includes(term)
//       );
//     }

//     setFilteredUsers(filtered);
//     setPage(1);
//   }, [search, roleFilter, statusFilter, users]);

//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === 'verified' ? 'banned' : 'verified';
//     const confirmed = confirm(`Set status to "${newStatus}"?`);
//     if (!confirmed) return;

//     const res = await fetch(`/api/admin/users/${id}/status`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     });

//     if (res.ok) {
//       toast.success('Status updated');
//       const updated = users.map(user =>
//         user._id === id ? { ...user, status: newStatus } : user
//       );
//       setUsers(updated);
//     } else {
//       toast.error('Update failed');
//     }
//   };

//   const toggleDisabled = async (id, currentDisabled) => {
//     const newState = !currentDisabled;
//     const confirmed = confirm(`Are you sure you want to ${newState ? 'deactivate' : 'activate'} this account?`);
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/admin/users/${id}/disabled`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ disabled: newState }),
//       });

//       if (!res.ok) throw new Error();

//       toast.success(`User ${newState ? 'deactivated' : 'activated'}`);
//       const updated = users.map(user =>
//         user._id === id ? { ...user, disabled: newState } : user
//       );
//       setUsers(updated);
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * USERS_PER_PAGE,
//     page * USERS_PER_PAGE
//   );

//   return (
//     <div className="p-4 md:p-6">
//       <h1 className="text-xl md:text-2xl font-semibold mb-4">User Management</h1>

//       <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-3 py-2 rounded-md shadow-sm w-full sm:w-auto"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />

//         {['all', 'admin', 'manager', 'user'].map(role => (
//           <button
//             key={role}
//             onClick={() => setRoleFilter(role)}
//             className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
//               roleFilter === role ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
//           </button>
//         ))}

//         {['all', 'verified', 'banned'].map(status => (
//           <button
//             key={status}
//             onClick={() => setStatusFilter(status)}
//             className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
//               statusFilter === status ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="overflow-x-auto rounded-lg border shadow">
//         <table className="min-w-[700px] w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Last Login</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.length > 0 ? (
//               paginatedUsers.map(user => (
//                 <tr key={user._id} className="border-t hover:bg-gray-50 transition-all">
//                   <td className="p-3">{user.firstname} {user.lastname}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3 capitalize">{user.role}</td>
//                   <td className="p-3 capitalize">
//                     {user.status}
//                     {user.disabled && (
//                       <span className="ml-2 px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded-full">
//                         DISABLED
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}
//                   </td>
//                   <td className="p-3 flex flex-wrap gap-2">
//                     <Link
//                       href={`/admin/users/${user._id}`}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       View
//                     </Link>

//                     {user._id !== currentUserId && (
//                       <>
//                         <button
//                           onClick={() => toggleStatus(user._id, user.status)}
//                           className={`px-2 py-0.5 rounded text-xs ${
//                             user.status === 'verified'
//                               ? 'bg-red-100 text-red-700'
//                               : 'bg-green-100 text-green-700'
//                           }`}
//                         >
//                           {user.status === 'verified' ? 'Ban' : 'Verify'}
//                         </button>

//                         <button
//                           onClick={() => toggleDisabled(user._id, user.disabled)}
//                           className={`px-2 py-0.5 rounded text-xs ${
//                             user.disabled
//                               ? 'bg-green-100 text-green-700'
//                               : 'bg-yellow-100 text-yellow-700'
//                           }`}
//                         >
//                           {user.disabled ? 'Activate' : 'Deactivate'}
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
//         <button
//           onClick={() => setPage(p => Math.max(p - 1, 1))}
//           disabled={page === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-sm">Page {page}</span>
//         <button
//           onClick={() => setPage(p => p + 1)}
//           disabled={page * USERS_PER_PAGE >= filteredUsers.length}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import toast from 'react-hot-toast';
// import UserTableSkeleton from '@/components/UserTableSkeleton';


// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [search, setSearch] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [page, setPage] = useState(1);
//   const USERS_PER_PAGE = 5;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const me = await fetch('/api/me').then(res => res.json());

//         const params = new URLSearchParams({
//           page: page.toString(),
//           limit: USERS_PER_PAGE.toString(),
//           role: roleFilter,
//           status: statusFilter,
//           search: search.trim(),
//           sort: 'createdAt',
//           order: 'desc',
//         });

//         const res = await fetch(`/api/admin/users?${params.toString()}`);
//         const data = await res.json();

//         setCurrentUserId(me._id);
//         setUsers(data.users);
//         setTotalUsers(data.total);
//       } catch {
//         toast.error('Failed to fetch users');
//       }
//     }

//     fetchData();
//   }, [page, search, roleFilter, statusFilter]);

//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === 'verified' ? 'banned' : 'verified';
//     const confirmed = confirm(`Set status to "${newStatus}"?`);
//     if (!confirmed) return;

//     const res = await fetch(`/api/admin/users/${id}/status`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus }),
//     });

//     if (res.ok) {
//       toast.success('Status updated');
//       setUsers(prev =>
//         prev.map(user =>
//           user._id === id ? { ...user, status: newStatus } : user
//         )
//       );
//     } else {
//       toast.error('Update failed');
//     }
//   };

//   const toggleDisabled = async (id, currentDisabled) => {
//     const newState = !currentDisabled;
//     const confirmed = confirm(
//       `Are you sure you want to ${newState ? 'deactivate' : 'activate'} this account?`
//     );
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/admin/users/${id}/disabled`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ disabled: newState }),
//       });

//       if (!res.ok) throw new Error();

//       toast.success(`User ${newState ? 'deactivated' : 'activated'}`);
//       setUsers(prev =>
//         prev.map(user =>
//           user._id === id ? { ...user, disabled: newState } : user
//         )
//       );
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <h1 className="text-xl md:text-2xl font-semibold mb-4">User Management</h1>

//       <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-3 py-2 rounded-md shadow-sm w-full sm:w-auto"
//           value={search}
//           onChange={e => {
//             setSearch(e.target.value);
//             setPage(1); // reset page on new search
//           }}
//         />

//         {['all', 'admin', 'manager', 'user'].map(role => (
//           <button
//             key={role}
//             onClick={() => {
//               setRoleFilter(role);
//               setPage(1);
//             }}
//             className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
//               roleFilter === role ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
//           </button>
//         ))}

//         {['all', 'verified', 'banned'].map(status => (
//           <button
//             key={status}
//             onClick={() => {
//               setStatusFilter(status);
//               setPage(1);
//             }}
//             className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
//               statusFilter === status ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="overflow-x-auto rounded-lg border shadow">
//         <table className="min-w-[700px] w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Last Login</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map(user => (
//                 <tr key={user._id} className="border-t hover:bg-gray-50 transition-all">
//                   <td className="p-3">{user.firstname} {user.lastname}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3 capitalize">{user.role}</td>
//                   <td className="p-3 capitalize">
//                     {user.status}
//                     {user.disabled && (
//                       <span className="ml-2 px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded-full">
//                         DISABLED
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-sm">
//                     {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}
//                   </td>
//                   <td className="p-3 flex flex-wrap gap-2">
//                     <Link
//                       href={`/admin/users/${user._id}`}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       View
//                     </Link>

//                     {user._id !== currentUserId && (
//                       <>
//                         <button
//                           onClick={() => toggleStatus(user._id, user.status)}
//                           className={`px-2 py-0.5 rounded text-xs ${
//                             user.status === 'verified'
//                               ? 'bg-red-100 text-red-700'
//                               : 'bg-green-100 text-green-700'
//                           }`}
//                         >
//                           {user.status === 'verified' ? 'Ban' : 'Verify'}
//                         </button>

//                         <button
//                           onClick={() => toggleDisabled(user._id, user.disabled)}
//                           className={`px-2 py-0.5 rounded text-xs ${
//                             user.disabled
//                               ? 'bg-green-100 text-green-700'
//                               : 'bg-yellow-100 text-yellow-700'
//                           }`}
//                         >
//                           {user.disabled ? 'Activate' : 'Deactivate'}
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
//         <button
//           onClick={() => setPage(p => Math.max(p - 1, 1))}
//           disabled={page === 1}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-sm">Page {page}</span>
//         <button
//           onClick={() => setPage(p => p + 1)}
//           disabled={page * USERS_PER_PAGE >= totalUsers}
//           className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import UserTableSkeleton from '@/components/UserTableSkeleton';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const USERS_PER_PAGE = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const me = await fetch('/api/me').then(res => res.json());

        const params = new URLSearchParams({
          page: page.toString(),
          limit: USERS_PER_PAGE.toString(),
          role: roleFilter,
          status: statusFilter,
          search: search.trim(),
          sort: 'createdAt',
          order: 'desc',
        });

        const res = await fetch(`/api/admin/users?${params.toString()}`);
        const data = await res.json();

        setCurrentUserId(me._id);
        setUsers(data.users);
        setTotalUsers(data.total);
      } catch {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, search, roleFilter, statusFilter]);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'verified' ? 'banned' : 'verified';
    const confirmed = confirm(`Set status to "${newStatus}"?`);
    if (!confirmed) return;

    const res = await fetch(`/api/admin/users/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      toast.success('Status updated');
      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } else {
      toast.error('Update failed');
    }
  };

  const toggleDisabled = async (id, currentDisabled) => {
    const newState = !currentDisabled;
    const confirmed = confirm(
      `Are you sure you want to ${newState ? 'deactivate' : 'activate'} this account?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${id}/disabled`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disabled: newState }),
      });

      if (!res.ok) throw new Error();

      toast.success(`User ${newState ? 'deactivated' : 'activated'}`);
      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, disabled: newState } : user
        )
      );
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">User Management</h1>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md shadow-sm w-full sm:w-auto"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {['all', 'admin', 'manager', 'user'].map(role => (
          <button
            key={role}
            onClick={() => {
              setRoleFilter(role);
              setPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
              roleFilter === role ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}

        {['all', 'verified', 'banned'].map(status => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={`px-4 py-1 rounded-full text-sm w-full sm:w-auto ${
              statusFilter === status ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border shadow">
        <table className="min-w-[700px] w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Login</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <UserTableSkeleton count={USERS_PER_PAGE} />
            ) : users.length > 0 ? (
              users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50 transition-all">
                  <td className="p-3">{user.firstname} {user.lastname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 capitalize">
                    {user.status}
                    {user.disabled && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded-full">
                        DISABLED
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/users/${user._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </Link>

                    {user._id !== currentUserId && (
                      <>
                        <button
                          onClick={() => toggleStatus(user._id, user.status)}
                          className={`px-2 py-0.5 rounded text-xs ${
                            user.status === 'verified'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {user.status === 'verified' ? 'Ban' : 'Verify'}
                        </button>

                        <button
                          onClick={() => toggleDisabled(user._id, user.disabled)}
                          className={`px-2 py-0.5 rounded text-xs ${
                            user.disabled
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {user.disabled ? 'Activate' : 'Deactivate'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * USERS_PER_PAGE >= totalUsers}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
