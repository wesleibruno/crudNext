export type User = {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  Department: {
    id: string;
    name: string;
  };
};
