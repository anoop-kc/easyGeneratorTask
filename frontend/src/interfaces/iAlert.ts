export interface iAlert {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
  dissmissAfter?: Number;
  dontDissmiss?: boolean;
}
