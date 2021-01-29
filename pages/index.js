import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import db from '../db.json';

import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          AluraQuiz -
          {db.title}
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
        >

          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (e) {
              e.preventDefault();

              router.push(`/quiz?name=${name}`);
            }}>
              <Input
                  name="nomeDoUsuario"
                  onChange={ (e) => setName(e.target.value) }
                  placeholder="Diz ai seu nome"
                  value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((link) => {
                const [projectName, gitHubUser] = link
                    .replace(/\//g,'')
                    .replace('https:','')
                    .replace('.vercel.app','')
                    .split('.');

                return (
                    <li key={link}>
                      <Widget.Topic
                          as={Link}
                          href={`/quiz/${projectName}___${gitHubUser}`}
                      >
                        {`${gitHubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
            as={motion.footer}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
                show: { opacity: 1 },
                hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/jamangueira7" />
    </QuizBackground>
  );
}
