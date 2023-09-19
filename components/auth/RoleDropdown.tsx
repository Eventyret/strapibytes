"use client"

import { updateRole } from '@/lib/auth/auth';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Role } from '@prisma/client';
import { GraduationCap, ShieldAlert, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from "react-hot-toast";

type RoleConfig = {
  // eslint-disable-next-line no-unused-vars
  [key in Role]: {
    color: string;
    icon: React.ComponentType;
  };
};

export const knownRoles: RoleConfig = {
  [Role.ADMIN]: { color: "text-red-500", icon: ShieldAlert },
  [Role.USER]: { color: "text-dark-purple", icon: User },
  [Role.TEACHER]: { color: "text-dark-purple", icon: GraduationCap },
};

interface RoleDropdownProps {
  userId: string;
  currentRole: Role;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({ userId, currentRole }) => {
  const router = useRouter();

  const dropdownItems = Object.entries(knownRoles).map(([role, { color, icon }]) => ({
    key: role,
    label: role,
    color,
    IconComponent: icon,
  }));

  const CurrentRoleIcon = knownRoles[currentRole].icon;

  const handleRoleChange = async (role: string) => {
    if (role === currentRole) return;
    try {
      const user = await updateRole(userId, role as Role);
      router.refresh();
      toast.success(`Success: Updated ${user.name}'s role to ${role}!`);
    } catch (error: any) {
      toast.error(`Failed to update role: ${error.message}`);
    }
  };

  return (
    <Dropdown backdrop='blur' showArrow>
      <DropdownTrigger>
        <Button variant="light" startContent={ <CurrentRoleIcon /> }>
          { currentRole }
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Roles">
        { dropdownItems.map(item => (
          <DropdownItem
            key={ item.key }
            onClick={ () => handleRoleChange(item.key) }
            startContent={ <item.IconComponent /> }
          >
            { item.label }
          </DropdownItem>
        )) }
      </DropdownMenu>
    </Dropdown>
  );
}
