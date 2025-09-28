import { Controller, useForm } from "react-hook-form";
import InputField from "../Component/InputField";
import doc from "../assets/icons/doc.png";
const documentTypes = [
  "Registration Number",
  "PAN Number",
  "License Number",
  "Tax ID",
];

export interface ClinicInfo {
  clinicFile: File | null;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicEmail: string;
  documentType: string;
  documentNumber: string;
  docFile: File | null;
  docName: string;
  docAddress: string;
  docPhone: string;
  docEmail: string;
  docDocumentType: string;
  docDocumentNumber: string;
}

const AddClinic = () => {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClinicInfo>({
    defaultValues: {
      clinicName: "",
      clinicAddress: "",
      clinicPhone: "",
      clinicEmail: "",
      documentType: "",
      documentNumber: "",
      clinicFile: null,
      docFile: null,
      docName: "",
      docAddress: "",
      docPhone: "",
      docEmail: "",
      docDocumentNumber: "",
      docDocumentType: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: ClinicInfo) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="px-[25px] pt-10  min-h-screen">
      <div className="max-w-4xl mx-auto  px-[1rem] py-[1rem] rounded-[10px] border border-amber-500 ">
        <label
          htmlFor="clinic"
          className="text-2xl font-bold text-customBlue  block mb-4"
        >
          Add Clinic
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-[2rem] border-b-2 border-amber-500 pb-3.5">
            <div className="shrink-0">
              <Controller
                name={`clinicFile`}
                control={control}
                rules={{ required: "Photo is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id={`file-input`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />

                    <div
                      onClick={() =>
                        document.getElementById(`file-input`)?.click()
                      }
                      className="flex h-[13.5rem] w-full cursor-pointer items-center justify-center rounded-[.625rem] border border-gray-300 bg-white sm:h-[8.5125rem] sm:w-[11.25rem]"
                    >
                      <img
                        src={value ? URL.createObjectURL(value) : doc}
                        className={`h-full w-full rounded-[.625rem] object-cover ${
                          errors.clinicFile ? "border border-red-500" : ""
                        }`}
                        alt="Document Preview"
                      />
                    </div>
                    {errors.clinicFile && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.clinicFile.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Name
                </label>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="Enter clinic name"
                    {...register("clinicName", {
                      required: "Clinic name is required",
                    })}
                  />
                  {errors.clinicName && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.clinicName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Address
                </label>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="Enter clinic address"
                    {...register("clinicAddress", {
                      required: "Clinic address is required",
                    })}
                  />
                  {errors.clinicAddress && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.clinicAddress.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Phone
                </label>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="Enter clinic phone"
                    {...register("clinicPhone", {
                      required: "Clinic phone is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                  />
                  {errors.clinicPhone && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.clinicPhone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Email
                </label>
                <div className="w-full">
                  <InputField
                    type="email"
                    placeholder="Enter clinic email"
                    {...register("clinicEmail", {
                      required: "Clinic email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.clinicEmail && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.clinicEmail.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="documentType"
                >
                  Document Type
                </label>
                <div className="w-full">
                  <select
                    className="w-full border h-[25px] px-2 cursor-pointer text-[13px] border-gray-300 rounded-[.625rem] bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    aria-label="Select document type"
                    {...register("documentType", {
                      required: "Document type is required",
                    })}
                  >
                    <option value="" disabled className=" text-[13px]">
                      Select document type
                    </option>
                    {documentTypes.map((type) => (
                      <option
                        className="cursor-pointer text-[.875rem]"
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.documentType && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.documentType.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Document Number
                </label>
                <div className="w-full">
                  <InputField
                    type="text"
                    placeholder="Enter Document Number"
                    {...register("documentNumber", {
                      required: "Document number is required",
                    })}
                  />
                  {errors.documentNumber && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {errors.documentNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-[20px]">
            <label
              htmlFor="doc"
              className="text-2xl font-bold text-customBlue  block mb-4"
            >
              Add Doctors
            </label>
            <div className="flex gap-[2rem] border-b-2 border-amber-500 pt-1 pb-3.5">
              <div className="">
                <span className=" text-[13px] font-semibold">
                  Doctor Certifcate
                </span>
                <Controller
                  name={`docFile`}
                  control={control}
                  // rules={{ required: "Photo is required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`file-input`}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                      />

                      <div
                        onClick={() =>
                          document.getElementById(`file-input`)?.click()
                        }
                        className="flex h-[13.5rem]  w-full cursor-pointer items-center justify-center rounded-[.625rem] border border-gray-300
                         bg-white sm:h-[8.5125rem] sm:w-[11.25rem]"
                      >
                        <img
                          src={value ? URL.createObjectURL(value) : doc}
                          className={`h-full w-full rounded-[.625rem] object-cover ${
                            errors.docFile ? "border border-red-500" : ""
                          }`}
                          alt="Document Preview"
                        />
                      </div>
                      {errors.docFile && (
                        <p className="text-red-500 text-[11px] mt-1">
                          {errors.docFile.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor Name
                  </label>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Enter doctor name"
                      {...register("docName", {
                        required: "Clinic name is required",
                      })}
                    />
                    {errors.docName && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor Address
                  </label>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Enter clinic address"
                      {...register("docAddress", {
                        required: "Clinic address is required",
                      })}
                    />
                    {errors.docAddress && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docAddress.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor Phone
                  </label>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Enter clinic phone"
                      {...register("docEmail", {
                        required: "Doctor phone is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Phone number must be 10 digits",
                        },
                      })}
                    />
                    {errors.docEmail && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docEmail.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor Email
                  </label>
                  <div className="w-full">
                    <InputField
                      type="email"
                      placeholder="Enter clinic email"
                      {...register("docEmail", {
                        required: "Clinic email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.docEmail && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docEmail.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="documentType"
                  >
                    Document Type
                  </label>
                  <div className="w-full">
                    <select
                      className="w-full border h-[25px] px-2 cursor-pointer text-[13px] border-gray-300 rounded-[.625rem] bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      aria-label="Select document type"
                      {...register("docDocumentType", {
                        required: "Document type is required",
                      })}
                    >
                      <option value="" disabled className=" text-[13px]">
                        Select document type
                      </option>
                      {documentTypes.map((type) => (
                        <option
                          className="cursor-pointer text-[.875rem]"
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.docDocumentType && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docDocumentType.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Document Number
                  </label>
                  <div className="w-full">
                    <InputField
                      type="text"
                      placeholder="Enter Document Number"
                      {...register("docDocumentNumber", {
                        required: "Document number is required",
                      })}
                    />
                    {errors.docDocumentNumber && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {errors.docDocumentNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 cursor-pointer py-1 bg-orange-500 text-white text-[13px] rounded-[10px] hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClinic;
