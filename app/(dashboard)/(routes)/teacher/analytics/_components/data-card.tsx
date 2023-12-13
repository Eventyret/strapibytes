import { formatPrice } from "@/lib/format";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-sm font-medium">{label}</h2>
      </CardHeader>
      <CardBody>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardBody>
    </Card>
  );
};
