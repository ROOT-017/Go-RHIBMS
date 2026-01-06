import styles from './modal.module.css';

import { ModalProps } from './modal.type';

const ModalTemplate: React.FC<ModalProps> = ({ setModal, modal, children }) => {
  return (
    <div
      className={`${styles.container} ${styles.modal} ${modal ? styles.active : ''}`}
    >
      <div className={styles.modal__content}>
        <div className={styles.top}>
          <div></div>
          <div className={styles.modal__close}>
            <button
              title="close modal"
              aria-label="close"
              onClick={() => setModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
