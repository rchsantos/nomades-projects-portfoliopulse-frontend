import React, { useState, ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
}

interface TabsHeaderProps {
  children: ReactNode;
}

interface TabsBodyProps {
  children: ReactNode;
}

interface TabProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

interface TabPanelProps {
  children: ReactNode;
  active: boolean;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export const TabsHeader: React.FC<TabsHeaderProps> = ({ children }) => {
  return <div className="flex space-x-4 border-b">{children}</div>;
};

export const TabsBody: React.FC<TabsBodyProps> = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

export const Tab: React.FC<TabProps> = ({ title, active, onClick }) => {
  return (
    <button
      className={`py-2 px-4 ${active ? 'border-b-4 border-solid border-global-color-primary' : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, active }) => {
  return active ? <div>{children}</div> : null;
};