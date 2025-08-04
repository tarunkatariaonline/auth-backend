interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILoginReq {
  email: string;
  password: string;
}

interface IUpdateProfile {
  id: string;
  name: string;
  email: string;
}

export { IRegisterReq, ILoginReq, IUpdateProfile };
