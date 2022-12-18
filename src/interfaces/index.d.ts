interface Role {
  id: number;
  name: string;
  description: string;
  parentId: number;
  key: string;
  createdAt: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roleId: number;
  createdAt: string;
}

interface RoleGroup {
  id: number;
  name: string;
  description: string;
  parentId: number;
  key: number;
  createdAt: string;
}

interface Document {
  id: number;
  formName: string;
  formId: string;
  issuedBy: string;
  issuedDate: string;
  status: string;
  updatedDate: string;
}