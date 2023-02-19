import { Button, Form, Input, Spin } from "antd";
import { useFormik } from "formik";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const session = useSession();

  return (
    <>
      <main>
        <h1>{hello.data?.greeting}</h1>

        <Spin spinning={session.status === "loading"}>
          {session.status === "authenticated" ? (
            <Button
              onClick={() => {
                signOut({
                  callbackUrl: "http://localhost:3000",
                }).catch(console.error);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                signIn("discord").catch(console.error);
              }}
            >
              Login
            </Button>
          )}
        </Spin>

        <MainForm />
      </main>
    </>
  );
};

export default Home;

const MainForm = () => {
  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: toFormikValidationSchema(z.object({ name: z.string() })),
  });

  return (
    <>
      <Form onFinish={formik.handleSubmit}>
        <Form.List name="names">
          {(fields) => {
            return (
              <>
                <Form.Item label="Name" name="name" rules={[{}]}>
                  <Input {...formik.getFieldProps("name")} />
                  <Form.ErrorList errors={[formik.errors.name]} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </>
  );
};
