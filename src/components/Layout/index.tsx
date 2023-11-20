import { ReactElement } from "react";
import style from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement;
}
const Layout = (props: LayoutProps) => {
  return (
    <div>
      <div className={style.header}></div>
      {props.children}
    </div>
  );
};

export default Layout;
