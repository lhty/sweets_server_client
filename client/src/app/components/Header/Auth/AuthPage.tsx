import React, { ReactElement, useState } from "react";
import * as styles from "./AuthPage.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useSpring, animated as a } from "react-spring";
import { LoadingOutlined } from "@ant-design/icons";

// import { SyncOutlined } from "@ant-design/icons";

interface Props {}

const AuthPage = ({}: Props): ReactElement => {
  const [toggleState, setToggleState] = useState("login");

  const { transform, opacity } = useSpring({
    opacity: toggleState === "login" ? 1 : 0,
    transform: `perspective(600px) rotateX(${
      toggleState === "login" ? 180 : 0
    }deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const [AnimatedLogin, AnimatedSignup] = [a(Login), a(Signup)];

  return (
    <>
      {toggleState === "login" ? (
        <AnimatedLogin
          style={{ transform }}
          btnHandler={() => setToggleState("signup")}
        />
      ) : (
        <AnimatedSignup
          style={{ transform }}
          btnHandler={() => setToggleState("login")}
        />
      )}
    </>
  );
};

const Login = ({ btnHandler }: { btnHandler: () => void }) => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Неправильный email")
      .required("Обязателньое поле"),
    password: yup.string().required("Обязательное поле").min(5),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        // make async call
        console.log("submit: ", values);
        setTimeout(() => setSubmitting(false), 15000);
      }}
    >
      {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <button
            type="button"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <Field
            type="password"
            name="password"
            placeholder="пароль"
            disabled={isSubmitting}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingOutlined /> : "Войти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Signup = ({ btnHandler }: { btnHandler: () => void }) => {
  const validationSchema = yup.object({
    name: yup.string().required("Обязателньое поле").min(3, "Некорректное имя"),
    email: yup
      .string()
      .email("Неправильный email")
      .required("Обязателньое поле"),
    password: yup.string().required("Обязательное поле").min(5),
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
            Войти
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
          <button type="submit" disabled={isSubmitting}>
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
