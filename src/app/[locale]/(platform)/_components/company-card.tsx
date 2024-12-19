import { Link } from "@/navigation";
import { Company } from "@/types/company";
import Image from "next/image";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="w-full hover:bg-secondary/50 flex flex-col rounded-lg p-3 gap-3 overflow-hidden duration-300">
      <Link
        href={`/podcaster/profile/company/${company?.id}`}
        className="w-full"
      >
        <div className="relative aspect-square rounded-lg">
          <Image
            src={company.image ? company.image : "/podcaster-filler.webp"}
            alt={`${company.full_name} thumbnail`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      </Link>
      <div className="flex flex-col items-start">
        <h3 className="font-bold text-xs text-greeny text-wrap capitalize">
          {company.full_name}
        </h3>
        <p className="font-bold text-xs text-wrap">
          {company.email ? company.email : ""}
        </p>
      </div>
    </div>
  );
};

export default CompanyCard;
