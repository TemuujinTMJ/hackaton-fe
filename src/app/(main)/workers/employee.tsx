"use client";

import { useState } from "react";
import Button from "@/app/_components/button";
import Header from "@/app/_components/header";
import Modal from "@/app/_components/modal";
import { Pen, Trash, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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
  phone_number?: number;
  address?: string;
}

interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  department?: string;
  position?: string;
  user_role: string;
  gender?: string;
  phone_number?: number;
  address?: string;
}

interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  department?: string;
  position?: string;
}

export default function Employee({ data: initialData }: { data: Employee[] }) {
  const [data, setData] = useState<Employee[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const getInitial = (str?: string) => (str && str.length > 0 ? str[0] : "");

  const validateForm = (employeeData: EmployeeFormData): boolean => {
    const newErrors: ValidationErrors = {};

    // first_name validation
    if (!employeeData.first_name || employeeData.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    } else if (employeeData.first_name.length > 50) {
      newErrors.first_name = "First name must be at most 50 characters";
    }

    // last_name validation
    if (!employeeData.last_name || employeeData.last_name.length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    } else if (employeeData.last_name.length > 50) {
      newErrors.last_name = "Last name must be at most 50 characters";
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employeeData.email || !emailRegex.test(employeeData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // phone_number validation (always required)
    if (
      employeeData.phone_number === undefined ||
      employeeData.phone_number === null ||
      employeeData.phone_number === 0 ||
      employeeData.phone_number.toString().trim() === ""
    ) {
      newErrors.phone_number = "Phone number is required";
    } else {
      const phoneStr = employeeData.phone_number.toString();
      if (!/^\d{8,12}$/.test(phoneStr)) {
        newErrors.phone_number = "Phone number must be 8-12 digits";
      }
    }

    // address validation (if provided)
    if (
      employeeData.address !== undefined &&
      employeeData.address !== null &&
      employeeData.address.trim() !== "" &&
      employeeData.address.length < 5
    ) {
      newErrors.address = "Address must be at least 5 characters";
    }

    // department validation (if provided)
    if (
      employeeData.department !== undefined &&
      employeeData.department !== null &&
      employeeData.department.trim() !== "" &&
      employeeData.department.length < 2
    ) {
      newErrors.department = "Department must be at least 2 characters";
    }

    // position validation (if provided)
    if (
      employeeData.position !== undefined &&
      employeeData.position !== null &&
      employeeData.position.trim() !== "" &&
      employeeData.position.length < 2
    ) {
      newErrors.position = "Position must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async (formData: EmployeeFormData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/workers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add employee");

      const newEmployee = await response.json();
      setData([...data, newEmployee.data]);
      toast.success("Ажилтан амжилттай нэмэгдлээ");
      setShowForm(false);
    } catch (error) {
      toast.error("Ажилтан нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id: string, formData: EmployeeFormData) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/workers/${id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update employee");

      const updatedEmployee = await response.json();

      // Merge with server response if needed
      setData((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, ...updatedEmployee.data } : emp
        )
      );

      toast.success("Ажилтны мэдээлэл шинэчлэгдлээ");
      setEditingEmployee(null);
    } catch (error) {
      toast.error("Ажилтны мэдээлэл шинэчлэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    employeeId: string | null;
  }>({ isOpen: false, employeeId: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = (id: string) => {
    setDeleteModal({ isOpen: true, employeeId: id });
  };

  const handleDeleteEmployee = async () => {
    if (!deleteModal.employeeId) return;
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/workers/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id: deleteModal.employeeId }),
      });
      if (!response.ok) throw new Error("Failed to delete employee");
      setData((prev) =>
        prev.filter((emp) => emp._id !== deleteModal.employeeId)
      );
      toast.success("Ажилтан амжилттай устгагдлаа");
      setDeleteModal({ isOpen: false, employeeId: null });
    } catch (error) {
      toast.error("Ажилтныг устгахад алдаа гарлаа");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Header
        title="Нийт ажилчид"
        extra={
          <Button
            props={{
              onClick: () => setShowForm(true),
              disabled: loading,
            }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Ажилтан нэмэх
          </Button>
        }
      />
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, employeeId: null })}
        title="Ажилтан устгах"
        primaryButton={{
          label: "Устгах",
          onClick: handleDeleteEmployee,
          loading: isDeleting,
        }}
        secondaryButton={{
          label: "Цуцлах",
          onClick: () => setDeleteModal({ isOpen: false, employeeId: null }),
        }}
      >
        <div className="py-4">
          <p className="text-white">
            Та энэ ажилтныг устгахдаа итгэлтэй байна уу?
          </p>
          <p className="text-gray-400 mt-2">Энэ үйлдлийг буцаах боломжгүй.</p>
        </div>
      </Modal>
      <Modal
        isOpen={showForm || editingEmployee !== null}
        onClose={() => {
          setShowForm(false);
          setEditingEmployee(null);
          setErrors({});
        }}
        title={
          editingEmployee ? "Ажилтны мэдээлэл засах" : "Шинэ ажилтан нэмэх"
        }
        primaryButton={{
          label: loading ? "Хадгалж байна..." : "Хадгалах",
          onClick: () => {
            // Get form data and submit
            const form = document.getElementById(
              "employeeForm"
            ) as HTMLFormElement;
            const formData = new FormData(form);
            const employeeData: EmployeeFormData = {
              first_name: formData.get("first_name") as string,
              last_name: formData.get("last_name") as string,
              email: formData.get("email") as string,
              department: formData.get("department") as string,
              position: formData.get("position") as string,
              user_role: formData.get("user_role") as string,
              gender: formData.get("gender") as string,
              phone_number: formData.get("phone_number")
                ? Number(formData.get("phone_number"))
                : undefined,
              address: (formData.get("address") as string) || undefined,
            };

            if (!validateForm(employeeData)) return;

            if (editingEmployee) {
              handleUpdateUser(editingEmployee._id, employeeData);
            } else {
              handleAddUser(employeeData);
            }
          },
          loading: loading,
        }}
        secondaryButton={{
          label: "Цуцлах",
          onClick: () => {
            setShowForm(false);
            setEditingEmployee(null);
            setErrors({});
          },
        }}
      >
        <form
          id="employeeForm"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name / Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Нэр</label>
            <input
              type="text"
              name="first_name"
              defaultValue={editingEmployee?.first_name}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              required
              minLength={2}
              pattern="[A-Za-z]+"
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Овог</label>
            <input
              type="text"
              name="last_name"
              defaultValue={editingEmployee?.last_name}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              required
              minLength={2}
              pattern="[A-Za-z]+"
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
            )}
          </div>
          {/* Email / Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Цахим шуудан
            </label>
            <input
              type="email"
              name="email"
              defaultValue={editingEmployee?.email}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Утасны дугаар
            </label>
            <input
              type="text"
              name="phone_number"
              defaultValue={editingEmployee?.phone_number || ""}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              pattern="^\d{8,12}$"
              title="Phone number must be 8-12 digits"
              required
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>
          {/* Address (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Хаяг</label>
            <input
              type="text"
              name="address"
              defaultValue={editingEmployee?.address || ""}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              minLength={5}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          {/* Department / Position */}
          <div>
            <label className="block text-sm font-medium mb-1">Алба</label>
            <input
              type="text"
              name="department"
              defaultValue={editingEmployee?.department}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              minLength={2}
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Албан тушаал
            </label>
            <input
              type="text"
              name="position"
              defaultValue={editingEmployee?.position}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              minLength={2}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-500">{errors.position}</p>
            )}
          </div>
          {/* Role / Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Эрх мэдэл</label>
            <select
              name="user_role"
              defaultValue={editingEmployee?.user_role || "worker"}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              required
            >
              <option value="worker">ажилтан</option>
              <option value="hr">хүний нөөц</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Хүйс</label>
            <select
              name="gender"
              defaultValue={editingEmployee?.gender || "male"}
              className="w-full px-3 py-2 border border-zinc-500 rounded-lg"
              required
            >
              <option value="male">Эрэгтэй</option>
              <option value="female">Эмэгтэй</option>
            </select>
          </div>
        </form>
      </Modal>

      <div className="mt-4 px-6 overflow-y-auto">
        <table className="min-w-full shadow-sm rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Нэр
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Цахим шуудан
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Алба
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Албан тушаал
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Эрх мэдэл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Утасны дугаар
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Хаяг
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Үйлдэл
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
                    <div className="h-8 w-8 rounded-full bg-blue-600 mr-3 flex items-center justify-center">
                      <span className="text-sm">
                        {getInitial(employee?.first_name || "")}
                        {getInitial(employee?.last_name || "")}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {employee.first_name} {employee.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.gender || "Not specified"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.department || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.position || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.user_role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {employee.user_role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.phone_number || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.address || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setEditingEmployee(employee)}
                      className="text-[#DDDDDD] hover:bg-[#2d2d2d]"
                      disabled={loading}
                    >
                      <Pen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(employee._id)}
                      className="text-[#DDDDDD] hover:bg-[#2d2d2d]"
                      disabled={loading}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
