import React, { ReactElement, useState } from "react";
import * as styles from "./AuthPage.css";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { LoadingOutlined } from "@ant-design/icons";
import { logIn } from "../../../redux/actions/user";

// import { SyncOutlined } from "@ant-design/icons";

interface Props {
  loading?: boolean;
  error?: boolean;
}

const AuthPage = ({ loading, error }: Props): ReactElement => {
  const [toggleState, setToggleState] = useState("login");

  return (
    <>
      {toggleState === "login" ? (
        <Login btnHandler={() => setToggleState("signup")} />
      ) : (
        <Signup btnHandler={() => setToggleState("login")} />
      )}
    </>
  );
};

const Login = ({ btnHandler }: { btnHandler: () => void }) => {
  const { error: onError, loading: onLoading } = useSelector(
    (state: RootState) => state.user
  );
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
      onSubmit={({ email, password }) => {
        dispatch(logIn({ email, password }));
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <button
            type="button"
            disabled={onLoading}
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
            disabled={onLoading}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            disabled={onLoading}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className={styles.form_login}
            type="submit"
            disabled={onLoading}
          >
            {onLoading ? <LoadingOutlined /> : "Войти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Signup = ({ btnHandler }: { btnHandler: () => void }) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Обязателньое поле.")
      .min(3, "Некорректное имя."),
    email: yup
      .string()
      .email("Неправильный email.")
      .required("Обязателньое поле."),
    password: yup.string().required("Обязательное поле.").min(5),
  });
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        // make async call
        console.log("submit: ", values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
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
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <button
            className={styles.form_signup}
            type="submit"
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
