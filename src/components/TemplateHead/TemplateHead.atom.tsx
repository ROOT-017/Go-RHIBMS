import React from 'react';

import styles from './template.module.css';

import { TemplateHeadProps } from './templatehead.type';

const TemplateHeadAtom: React.FC<TemplateHeadProps> = ({ title, caption }) => {
  return (
    <div className={styles.template__head}>
      <h2>{title}</h2>
      <p>{caption}</p>
    </div>
  );
};

export default TemplateHeadAtom;
