import { IconType } from "react-icons";

export type PlayerRecord = {
  token: {
    Icon: IconType;
    size: number;
    bgColor: string;
    textColor: string;
  };
  value: number;
};
