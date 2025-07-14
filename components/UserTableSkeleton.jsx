function UserTableSkeleton({ count = 5 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <tr key={i} className="border-t animate-pulse">
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-24" />
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-40" />
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-20" />
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-28" />
          </td>
          <td className="p-3">
            <div className="h-4 bg-gray-200 rounded w-24" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default UserTableSkeleton