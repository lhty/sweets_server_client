import React, { ReactElement, useState } from "react";
import * as styles from "./AuthPage.css";

import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { LoadingOutlined } from "@ant-design/icons";
import {
  setUser,
  setToken,
  onError,
  onReset,
} from "../../../redux/actions/user";
import {
  UsersPermissionsRegisterInput,
  UsersPermissionsLoginInput,
} from "../../../@types/queryTypes";

interface authProps {
  loginHandler: (obj: any) => any;
  signupHandler: () => void;
  isLoading: boolean;
  isError: boolean;
}

const AuthPage = ({
  loginHandler,
  signupHandler,
  isLoading,
  isError,
}: authProps): ReactElement => {
  const [toggleState, setToggleState] = useState("login");

  return (
    <>
      {toggleState === "login" ? (
        <Login
          btnHandler={() => setToggleState("signup")}
          {...{ loginHandler, isLoading, isError }}
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
  isError: boolean;
}

const Login = ({
  btnHandler,
  loginHandler,
  isLoading,
  isError,
}: loginProps): ReactElement => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    identifier: yup
      .string()
      .email("Неправильный email.")
      .required("Обязателньое поле."),
    password: yup
      .string()
      .required("Обязателньое поле.")
      .min(6, "Слишком короткий пароль.")
      .matches(/[A-Za-z0-9]/, "Только латинские буквы и цифры."),
  });

  const handleSubmit = async ({
    identifier,
    password,
  }: UsersPermissionsLoginInput) => {
    try {
      const {
        data: { login },
      } = await loginHandler({
        variables: {
          input: {
            identifier,
            password,
            provider: "local",
          },
        },
      });
      dispatch(setToken(login.jwt));
      dispatch(setUser(login.user));
    } catch (e) {
      dispatch(onError());
    }
  };
  const hasErrors = isError;

  return (
    <Formik
      initialValues={{ identifier: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <button
            type="button"
            disabled={isLoading}
            className={styles.form_signup}
            onClick={btnHandler}
          >
            Регистрация
          </button>
          <ErrorMessage name="identifier" component="div" />
          <Field
            type="email"
            name="identifier"
            placeholder="email"
            disabled={isLoading}
            value={values.identifier}
            onChange={handleChange}
          />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            disabled={isLoading}
            value={values.password}
            onChange={handleChange}
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

  const handleSubmit = async ({
    username,
    email,
    password,
  }: UsersPermissionsRegisterInput) => {
    try {
      const {
        data: { register },
      } = await signupHandler({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });
      dispatch(setToken(register.jwt));
      dispatch(setUser(register.user));
    } catch (e) {
      dispatch(onError());
    }
  };

  const validationSchema = yup.object({
    username: yup
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
      initialValues={{ username: "", email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
            name="username"
            placeholder="Имя"
            disabled={isLoading}
            value={values.username}
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
