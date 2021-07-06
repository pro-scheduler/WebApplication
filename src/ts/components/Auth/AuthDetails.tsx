import React from 'react';

export type AuthDetailsProps = {
  title: string;
  children: React.ReactNode[];
};

const AuthDetails = ({ title, children }: AuthDetailsProps) => {
  return (
    <div>
      <h2 className="mt-4 ml-2 mb-5">{title}</h2>
      <div className="text-center mb-4">{children}</div>
    </div>
  );
};

export default AuthDetails;
