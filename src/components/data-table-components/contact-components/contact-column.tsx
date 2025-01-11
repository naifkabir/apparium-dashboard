"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import { ShowMassageDialog } from "@/components/contact-us-inquiry/ShowMassageDialog";
import { Button } from "@/components/ui/button";
import { ContactUsDataInterface } from "@/components/contact-us-inquiry/MainPageComp";
import ButtonLoadingAnimation from "@/components/loading-animations/Button-loading-animation";

interface ColumnProps {
  handleDelete: (queryId: string) => void;
  buttonLoadingDelete: Record<string, boolean>;
}

export const ContactUsColumn = ({
  handleDelete,
  buttonLoadingDelete,
}: ColumnProps): ColumnDef<ContactUsDataInterface>[] => {
  return [
    {
      accessorKey: "_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User Id" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-start w-full">{row.original._id}</div>
      ),
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex justify-start items-center">
          <DataTableColumnHeader column={column} title="Name" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="gap-5 w-full flex items-center justify-start">
          {row.original.name}
        </div>
      ),
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <div className="flex justify-start items-center">
          <DataTableColumnHeader column={column} title="Email" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="gap-5 w-full flex items-center justify-start">
          {row.original.email}
        </div>
      ),
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "contact_no",
      header: ({ column }) => (
        <div className="flex justify-start items-center">
          <DataTableColumnHeader column={column} title="Phone Number" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="gap-5 w-full flex items-center justify-start">
          {row.original.contact_no}
        </div>
      ),
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "massage",
      header: ({ column }) => (
        <div className="grid place-items-center w-full">
          <DataTableColumnHeader column={column} title="Message" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="grid place-items-center">
          <ShowMassageDialog data={row.original.message}>
            <Button className="w-28 h-10">View Massage</Button>
          </ShowMassageDialog>
        </div>
      ),
      enableHiding: true,
      enableSorting: false,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const message_id = row.original["_id"];
        return (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => handleDelete(row.original["_id"])}
              variant="destructive"
              className="w-28 h-10"
              disabled={buttonLoadingDelete[message_id]}>
              {buttonLoadingDelete[message_id] ? (
                <ButtonLoadingAnimation text="Deleting" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        );
      },
    },
  ];
};
