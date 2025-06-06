import { Pencil, Trash } from "lucide-react";
import StyledText from "../../components/styledText";

const presence = (
  str: string | null | undefined,
  symbol: string = "N/A"
): string => {
  if (!str) {
    return symbol;
  }
  return str ? str : symbol ? symbol : "N/A";
};

export const columns = (onEdit: any, onDelete: any) => [
  {
    key: "name",
    title: "Name",
    align: "center",
    dataIndex: "name",
    render: (name: any) => (
      <StyledText className="m-0">{presence(name)}</StyledText>
    ),
  },
  {
    key: "age",
    title: "Age",
    align: "center",
    dataIndex: "age",
    render: (age: any) => (
      <StyledText className="m-0">{presence(age)}</StyledText>
    ),
  },
  {
    key: "gender",
    title: "Gender",
    align: "center",
    dataIndex: "gender",
    render: (gender: any) => (
      <StyledText className="m-0">{presence(gender)}</StyledText>
    ),
  },
  {
    key: "phone",
    title: "Phone",
    align: "center",
    dataIndex: "phone",
    render: (phone: any) => (
      <StyledText className="m-0">{presence(phone)}</StyledText>
    ),
  },
  {
    title: "Address",
    align: "center",
    render: (row: any) => {
      const fullAddress = `${row.address ?? ""} ${row.city ?? ""} ${
        row.state ?? ""
      } ${row.country ?? ""} ${row.pincode ?? ""}`.trim();
      return (
        <>
          <div className="w-[200px] mx-auto">
            <StyledText className="m-0 break-words whitespace-normal leading-tight">
              {presence(fullAddress)}
            </StyledText>
          </div>
        </>
      );
    },
  },
  {
    key: "blood_group",
    title: "Blood Group",
    align: "center",
    dataIndex: "blood_group",
    render: (blood_group: any) => (
      <StyledText className="m-0">{presence(blood_group)}</StyledText>
    ),
  },
  {
    key: "ongoing_illness",
    title: "Ongoing Illness",
    align: "center",
    dataIndex: "ongoing_illness",
    render: (ongoing_illness: any) => (
      <StyledText className="m-0">{presence(ongoing_illness)}</StyledText>
    ),
  },
  {
    key: "problem",
    title: "Problem",
    align: "center",
    dataIndex: "problem",
    render: (problem: any) => {
      return (
        <>
          <div className="w-[200px] mx-auto">
            <StyledText className="m-0 break-words whitespace-normal leading-tight">
              {presence(problem)}
            </StyledText>
          </div>
        </>
      );
    },
  },
  {
    key: "manage",
    title: "Action",
    align: "center",
    render: (row: any) => (
      <div className="flex items-center justify-center gap-10">
        <Pencil
          size={20}
          className="cursor-pointer text-[var(--primary-color)] hover:text-[var(--dark-primary-color)] transition-colors duration-200"
          onClick={() => onEdit(row)}
        />
        <Trash
          size={20}
          className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200"
          onClick={() => onDelete(row)}
        />
      </div>
    ),
  },
];
