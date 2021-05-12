import React from 'react';
import { Link } from 'react-router-dom';
import './AuthDetails.css';

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
      <div className="redirect">
        <p className="ml-2 mt-5 redirect">{question}</p>
        <Link to={redirectTo} className="ml-2 pb-5 link">
          {redirectText}
        </Link>
      </div>
    </div>
  );
};

export default AuthDetails;
