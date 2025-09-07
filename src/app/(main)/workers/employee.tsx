"use client";
interface Employee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  department?: string;
  position?: string;
  user_role: string;
  startedJobAt?: string;
  profile_img?: string;
  gender?: string;
}

export default function Employee({ data }: { data: Employee[] }) {
  return (
    <div className="mt-4 px-6 overflow-y-auto">
      <table className="min-w-full shadow-sm rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, idx) => (
            <tr
              key={employee._id}
              className={`${
                idx % 2 === 0 && "bg-[#1C1D2F]"
              } border-b border-transparent hover:border-gray-500`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full  mr-3 flex items-center justify-center`}
                  >
                    <span className="text-gray-500 text-sm">
                      {employee.first_name[0]}
                      {employee.last_name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {employee.gender || "Not specified"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.position || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    employee.user_role === "hr"
                      ? "bg-purple-100 text-purple-800"
                      : employee.user_role === "worker"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {employee.user_role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.startedJobAt
                  ? new Date(employee.startedJobAt).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
