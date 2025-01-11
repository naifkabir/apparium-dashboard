"use client";

import { useEffect, useState } from "react";
import { ContactUsColumn } from "../data-table-components/contact-components/contact-column";
import { ContactDataTable } from "../data-table-components/contact-components/contact-data-table";
import {
  DeleteInquiryMassage,
  GetAllInquiryMassages,
} from "@/actions/InquiryMassage.action";
import PageLoadingAnimation from "../loading-animations/Page-loading-animation";
import ErrorAnimation from "../loading-animations/Error-animation";
import { toast } from "sonner";

export interface ContactUsDataInterface {
  _id: string;
  name: string;
  email: string;
  contact_no: string;
  message: string;
}

const MainPageCompInquiry = () => {
  const [data, setData] = useState<ContactUsDataInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoadingDelete, setButtonLoadingDelete] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await GetAllInquiryMassages();

        if ("error" in response) {
          setError(response.error);
        } else {
          setData(response.data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (message_id: string) => {
    setButtonLoadingDelete((prev) => ({ ...prev, [message_id]: true }));
    try {
      const result = await DeleteInquiryMassage(message_id);
      if (result.success) {
        setData((prevData) =>
          prevData.filter((massage) => massage._id !== message_id)
        );
        toast.success(result.message);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setButtonLoadingDelete((prev) => ({ ...prev, [message_id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <PageLoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ErrorAnimation massage={error} />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-14">
        <ContactDataTable
          columns={ContactUsColumn({ handleDelete, buttonLoadingDelete })}
          data={data || []}
        />
      </div>
    </div>
  );
};

export default MainPageCompInquiry;
