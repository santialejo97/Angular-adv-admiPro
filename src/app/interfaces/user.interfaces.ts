export interface User {
  email: string;
  google?: boolean;
  name: string;
  role: string;
  uid?: string;
  img?: string;
}

export interface update {
  ok: boolean;
  msg: string;
  userUpdate: User;
}
