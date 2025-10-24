"use server";

import db from "@/lib/db";

import { REST_METHOD } from "@prisma/client";

export type Request = {
  name: string;
  method: REST_METHOD;
  url: string;

  body?: string;
  headers?: string;
  parameters?: string;
};

export const addRequestToCollection = async (
  collectionId: string,
  value: Request
) => {
  const request = await db.request.create({
    data: {
      collectionId,
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers,
      parameters: value.parameters,
    },
  });

  return request;
};

export const saveRequest = async (id: string, value: Request) => {
  const request = await db.request.update({
    where: {
      id: id,
    },
    data: {
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers,
      parameters: value.parameters,
    },
  });

  return request;
};

export const getallRequestFromCollection = async (collectionId: string) => {
  const requests = await db.request.findMany({
    where: { collectionId },
  });
  return requests;
};
