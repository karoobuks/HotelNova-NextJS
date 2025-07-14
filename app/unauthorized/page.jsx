export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700">You do not have permission to view this page.</p>
      </div>
    </div>
  );
}
