export type Action = { type: "UPDATE"; payload: any[] };

export const update = (data: any[]): Action => ({
  type: "UPDATE",
  payload: data,
});
