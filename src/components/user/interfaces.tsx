export interface menuDialogInterface {
  open: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  setOpen: (val: boolean) => void;
  setAlert: (val: boolean) => void;
  editUser: (val: { name: string; email: string }) => void;
}

export interface newPostDialogInterface {
  open: boolean;
  setOpen: (val: boolean) => void;
  setPosts: (prev?: any) => void;
  user: {
    _id: string;
  };
}

export interface TabPropsInterface {
  value: number;
  index: number;
  children?: React.ReactNode;
}
