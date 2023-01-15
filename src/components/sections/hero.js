import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .location-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = (
    <h2 className="big-heading">
      <TypeAnimation sequence={['Aditya Choudhari.', 1500]} cursor={false} />
    </h2>
  );
  const three = (
    <h3 className="big-heading">
      {' '}
      <TypeAnimation sequence={[1500, 'I am a full-stack software engineer.', 1500]} />
    </h3>
  );
  const five = (
    <div className="location-div">
      <div className="location-icon">
        <FaMapMarkerAlt className="location-icon" fontSize={20} />
      </div>
      San Francisco
    </div>
  );
  const four = (
    <>
      <p>
        I’m a full-stack software engineer who has experience across many stacks and technologies. I
        am currently spending most of my dev time coding in Go and Typescript, working with GraphQL
        and MySQL.
      </p>

      <p>
        I am currently @{' '}
        <a href="https://wandb.ai/site" target="_blank" rel="noreferrer">
          Weights & Biases
        </a>
        .
      </p>
    </>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
