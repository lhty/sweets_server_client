import React, { ReactElement, useState } from "react";
import * as styles from "./AuthPage.css";

import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { LoadingOutlined } from "@ant-design/icons";
import { setUser, setToken } from "../../../redux/actions/user";

interface authProps {
  loginHandler: (obj: any) => any;
  signupHandler: () => void;
  isLoading: boolean;
}

const AuthPage = ({
  loginHandler,
  signupHandler,
  isLoading,
}: authProps): ReactElement => {
  const [toggleState, setToggleState] = useState("login");

  return (
    <>
      {toggleState === "login" ? (
        <Login
          btnHandler={() => setToggleState("signup")}
          {...{ loginHandler, isLoading }}
        />
      ) : (
        <Signup
          btnHandler={() => setToggleState("login")}
          {...{ signupHandler, isLoading }}
        />
      )}
    </>
  );
};

interface loginProps {
  btnHandler: () => void;
  loginHandler: (obj: any) => any;
  isLoading: boolean;
}

const Login = ({
  btnHandler,
  loginHandler,
  isLoading,
}: loginProps): ReactElement => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Неправильный email.")
      .required("Обязателньое поле."),
    password: yup
      .string()
      .required("Обязателньое поле.")
      .min(6, "Слишком короткий пароль.")
      .matches(/[A-Za-z0-9]/, "Только латинские буквы и цифры."),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={async ({ email, password }) => {
        const {
          data: { login },
        } = await loginHandler({
          variables: {
            input: {
              identifier: email,
              password: password,
              provider: "local",
            },
          },
        });
        dispatch(setUser(login.user));
        dispatch(setToken(login.jwt));
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <button
            type="button"
            disabled={isLoading}
            className={styles.form_signup}
            onClick={btnHandler}
          >
            Регистрация
          </button>
          <ErrorMessage name="email" component="div" />
          <Field
            type="email"
            name="email"
            placeholder="email"
            disabled={isLoading}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            disabled={isLoading}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className={styles.form_login}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingOutlined /> : "Войти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

interface signupProps {
  btnHandler: () => void;
  signupHandler: (obj: any) => any;
  isLoading: boolean;
}

const Signup = ({
  btnHandler,
  signupHandler,
  isLoading,
}: signupProps): ReactElement => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Обязателньое поле.")
      .min(3, "Некорректное имя."),
    email: yup
      .string()
      .email("Неправильный email.")
      .required("Обязателньое поле."),
    password: yup.string().required("Обязательное поле.").min(6),
  });
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={async ({ name, email, password }) => {
        const {
          data: { register },
        } = await signupHandler({
          variables: {
            input: {
              username: name,
              email: email,
              password: password,
            },
          },
        });
        dispatch(setUser(register.user));
        dispatch(setToken(register.jwt));
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <button
            type="button"
            className={styles.form_login}
            onClick={btnHandler}
          >
            Вход
          </button>
          <Field
            type="name"
            name="name"
            placeholder="Имя"
            disabled={isLoading}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="name" component="div" />
          <Field
            type="email"
            name="email"
            placeholder="email"
            value={values.email}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            disabled={isLoading}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <button
            className={styles.form_signup}
            type="submit"
            disabled={isLoading}
          >
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
