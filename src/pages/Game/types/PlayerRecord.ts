import { IconType } from "react-icons";

export type PlayerRecord = {
  token: {
    Icon: IconType;
    size: number;
    color: string;
  };
  value: number;
};
