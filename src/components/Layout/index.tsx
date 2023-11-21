import { ReactElement } from "react";
import style from "./Layout.module.css";

interface LayoutProps {
  children: ReactElement;
}
const Layout = (props: LayoutProps) => {
  return (
    <div className={style.container}>
      <div className={style.header} />
      <div className={style.childrenContainer}> {props.children}</div>
    </div>
  );
};

export default Layout;
