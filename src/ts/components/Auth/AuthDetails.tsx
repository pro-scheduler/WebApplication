import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthDetails.module.css';

export type AuthDetailsProps = {
  title: string;
  question: string;
  redirectText: string;
  redirectTo: string;
  children: React.ReactNode[];
};

const AuthDetails = ({ title, question, redirectText, redirectTo, children }: AuthDetailsProps) => {
  return (
    <div>
      <h1 className="mt-4 ml-2 mb-5">{title}</h1>
      <div className="text-center mb-4">{children}</div>
      <div className="ml-2 mt-5">
        <p className={styles.redirectQuestion}>{question}</p>
        <Link to={redirectTo} className={styles.link}>
          {redirectText}
        </Link>
      </div>
    </div>
  );
};

export default AuthDetails;
