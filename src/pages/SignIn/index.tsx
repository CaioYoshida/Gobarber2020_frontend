import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../util/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      if (formRef.current) {
        formRef.current.setErrors({});
      }

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Enter with a valid e-mail')
          .required('E-mail is required'),
        password: Yup.string().required('Enter with your password'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);

      if (formRef.current) {
        formRef.current.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit} initialData={{}}>
          <h1>Enter with your login</h1>

          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Enter</Button>
          <a href="forgot">
            <FiLogIn />
            Forgot my password
          </a>
        </Form>

        <a href="forgot">
          <FiLogIn />
          Create account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
