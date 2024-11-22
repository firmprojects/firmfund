import { groups } from "@/lib/data";
import { notFound } from "next/navigation";
import { GroupDetailsClient } from "@/components/group-details-client";

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const groupData = groups.find((g) => g.id === params.id);

  if (!groupData) {
    notFound();
  }

  return <GroupDetailsClient groupData={groupData} />;
}