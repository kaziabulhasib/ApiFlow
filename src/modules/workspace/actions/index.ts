"use server";

import { ChartLegend } from "@/components/ui/chart";
import db from "@/lib/db";
import { currentUser } from "@/modules/authentication/actions";
import { MEMBER_ROLE } from "@prisma/client";

export const initializeWorkspace = async () => {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      error: "user not found",
    };
  }

  try {
    const workspace = await db.workspace.upsert({
      where: {
        name_ownerId: {
          ownerId: user.id,
          name: "personal workspace",
        },
      },
      update: {},
      create: {
        name: "personal workspace",
        description: "This is Default your personal workspace",
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: MEMBER_ROLE.ADMIN,
          },
        },
      },
      include: {
        members: true,
      },
    });
    return { success: true, workspace };
  } catch (error) {
    console.error("Error initializing workspace:", error);
    return { success: false, error: "Failed to initialize workspace" };
  }
};

export async function getWorkspaces() {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const workspaces = await db.workspace.findMany({
    where: {
      OR: [{ ownerId: user.id }, { members: { some: { userId: user.id } } }],
    },
    orderBy: { createdAt: "asc" },
  });

  return workspaces;
}

export async function createWorkspaces(name: string) {
  const user = await currentUser();
  console.log("from line 65F", user);
  if (!user) throw new Error("unauthorized");
  const workspace = await db.workspace.create({
    data: {
      name,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: MEMBER_ROLE.ADMIN,
        },
      },
    },
  });
  return workspace;
}

export const getWorkspaceById = async (id: string) => {
  if (!id) {
    throw new Error("Workspace ID is missing or undefined");
  }

  const workspace = await db.workspace.findUnique({
    where: { id },
    include: {
      members: true,
    },
  });
  return workspace;
};
