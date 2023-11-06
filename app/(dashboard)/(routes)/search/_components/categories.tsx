"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcGraduationCap,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { PiMathOperationsDuotone, PiCookingPotDuotone } from "react-icons/pi";
import { GiFlexibleStar } from "react-icons/gi";
import { FcBiotech } from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-items";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Strapi: FcGraduationCap,
  Mathematics: PiMathOperationsDuotone,
  Cooking: PiCookingPotDuotone,
  Biology: FcBiotech,
  Astronomy: GiFlexibleStar,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
