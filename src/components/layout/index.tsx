import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

const { Content, Sider } = Layout;

function AppLayout({ children }: Props) {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path).catch(console.error);
    },
    [router]
  );

  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: "home",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: "About",
      key: "about",
      onClick: () => {
        navigate("/about");
      },
    },
  ];
  return (
    <div>
      <Layout hasSider>
        <Sider className={styles.sider}>
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default AppLayout;
