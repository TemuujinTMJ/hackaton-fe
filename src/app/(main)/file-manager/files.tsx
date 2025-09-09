"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Image from "next/image";
import { Trash, Upload } from "lucide-react";

interface FilesProps {
  id: string;
  metadata: {
    name: string;
    size: number;
  };
}

function getFileType(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "xlsx":
    case "xls":
      return {
        icon: "/file/icon-excel.png",
        color: "bg-[#1e1e1e] border-zinc-800",
        type: "Excel",
      };
    case "doc":
    case "docx":
      return {
        icon: "/file/icon-word.png",
        color: "bg-[#1e1e1e] border-zinc-800",
        type: "Word",
      };
    case "pdf":
      return {
        icon: "/file/icon-pdf.png",
        color: "bg-[#1e1e1e] border-zinc-800",
        type: "PDF",
      };
    case "js":
    case "ts":
    case "json":
      return {
        icon: "/file/icon-ts.png",
        color: "bg-[#1e1e1e] border-zinc-800",
        type: "Image",
      };
    default:
      return {
        icon: "/file/icon-ts.png",
        color: "bg-[#1e1e1e] border-zinc-800",
        type: "Image",
      };
  }
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface FilesComponentProps {
  files: FilesProps[];
  onUploadSuccess?: () => void;
}

export default function Files({
  files: initialFiles,
  onUploadSuccess,
}: FilesComponentProps) {
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<FilesProps[]>(initialFiles);
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Update files state when initialFiles prop changes
  React.useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  React.useEffect(() => {
    onUploadSuccess?.();
  }, [files, onUploadSuccess]);

  const deleteFile = async (id: string) => {
    try {
      setDeleting(id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/file`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
      toast.success("Файл амжилттай устгагдлаа");
      onUploadSuccess?.();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Файл устгахад алдаа гарлаа");
    } finally {
      setDeleting(null);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("size", file.size.toString());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/file/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || "Upload failed");
      }

      const newFile: FilesProps = {
        id: jsonResponse.id || Date.now().toString(),
        metadata: {
          name: file.name,
          size: file.size,
        },
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);

      toast.success("Файл амжилттай орууллаа.");
      return jsonResponse;
    } catch (error) {
      console.error(error);
      toast.error("Файл оруулахад алдаа гарлаа.");
      throw error;
    }
  };
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);

      try {
        for (const file of acceptedFiles) {
          await uploadFile(file);
        }
        onUploadSuccess?.();
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload files"
        );
      } finally {
        setUploading(false);
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="p-4 min-h-screen  text-white">
      <div className="relative mb-8 flex justify-between gap-4">
        <input
          type="text"
          placeholder="Хайх..."
          className="flex-1 px-4 py-2 border border-zinc-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2  border border-zinc-500 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">Бүх төрөл</option>
          <option value="xlsx">Excel</option>
          <option value="docx">Word</option>
          <option value="pdf">PDF</option>
          <option value="code">JSON</option>
        </select>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        <div className="group p-4 ${fileType.color} border rounded-2xl transition-all hover:border-blue-500 bg-[#FFFFFF0D] min-w-[300px]">
          <div
            {...getRootProps()}
            className="relative p-8  border border-zinc-800 rounded-lg text-center cursor-pointer transition-all"
          >
            <input {...getInputProps()} disabled={uploading} />
            <div className="flex flex-col items-center">
              <Upload className="mb-4" />
              <p className="text-lg font-medium text-white mb-1">
                Файл оруулах
              </p>
              <p className="text-sm text-gray-500">
                Энд дарж файл сонгох эсвэл чирж оруулна уу
              </p>
            </div>
            <button className="mt-4 px-6 py-2 bg-[#FFFFFF1A] text-white rounded-lg hover:bg-[#3d3d3d]">
              Сонгох
            </button>
          </div>
        </div>
        {/* Filter and render files */}
        {files.filter((file) => {
          const fileName = file.metadata.name.toLowerCase();
          const matchesSearch = searchQuery
            ? fileName.includes(searchQuery.toLowerCase())
            : true;

          if (!matchesSearch) return false;

          if (selectedType === "all") return true;
          const extension = fileName.split(".").pop();

          switch (selectedType) {
            case "xlsx":
              return ["xlsx", "xls"].includes(extension || "");
            case "docx":
              return ["doc", "docx"].includes(extension || "");
            case "pdf":
              return extension === "pdf";
            case "code":
              return ["js", "ts", "json"].includes(extension || "");
            default:
              return true;
          }
        }).length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {files.length === 0
              ? "Одоогоор файл байхгүй байна"
              : "Хайлтад тохирох файл олдсонгүй"}
          </div>
        ) : (
          files
            .filter((file) => {
              const fileName = file.metadata.name.toLowerCase();
              const matchesSearch = searchQuery
                ? fileName.includes(searchQuery.toLowerCase())
                : true;

              if (!matchesSearch) return false;

              if (selectedType === "all") return true;
              const extension = fileName.split(".").pop();

              switch (selectedType) {
                case "xlsx":
                  return ["xlsx", "xls"].includes(extension || "");
                case "docx":
                  return ["doc", "docx"].includes(extension || "");
                case "pdf":
                  return extension === "pdf";
                case "code":
                  return ["js", "ts", "json"].includes(extension || "");
                default:
                  return true;
              }
            })
            .map((file) => {
              const fileType = getFileType(file.metadata.name);
              return (
                <div
                  key={file.id}
                  className={`group p-4 ${fileType.color} border rounded-2xl transition-all bg-[#FFFFFF0D] min-w-[300px]`}
                >
                  <div className="flex items-center justify-center bg-[#FFFFFF1A] h-40 rounded-3xl">
                    <Image
                      src={fileType.icon}
                      alt={fileType.type}
                      width={70}
                      height={70}
                      className="mb-3"
                    />
                  </div>
                  <div className="flex justify-between mt-4 truncate overflow-hidden text-wrap">
                    <div>
                      <h2 className="text-sm font-medium text-white w-full mb-1 break-all">
                        {file.metadata.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.metadata.size)}
                      </p>
                    </div>
                    <button
                      className="px-3 py-1 text-white rounded hover:bg-[#3d3d3d] h-min"
                      onClick={() => deleteFile(file.id)}
                      disabled={deleting === file.id}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
