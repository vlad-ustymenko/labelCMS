"use client";
import { useModalContext } from "@/context/ModalContext";
import { useEffect } from "react";
// import { X } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Modal.module.css";

const Modal = () => {
  const { activeModal, setActiveModal, loading } = useModalContext();

  useEffect(() => {
    const isModalOpen = activeModal;
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [activeModal]);

  const modalRef = useClickOutside(() => setActiveModal(false));

  return (
    <div
      className={
        activeModal
          ? `${styles.container} ${styles.active}`
          : `${styles.container}`
      }
    >
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.loaderOuter}></div>
          <div className={styles.loaderInner}></div>
        </div>
      ) : (
        <div className={styles.contentWrapper} ref={modalRef}>
          <div className={styles.imageWrapper}>
            <Image
              src="/modalImage.jpg"
              alt="logo"
              fill
              sizes="(max-width: 768px) 90vw, (min-width: 768px) and (max-width: 1023px) 50vw, 30vw"
              className={styles.image}
            ></Image>
          </div>
          <div>
            <h2 className={styles.title}>Title</h2>
            <p className={styles.content}>Content</p>
            <div className={styles.socialWrapper}>
              <h3 className={styles.socialTitle}>Social</h3>
              <ul className={styles.socialIcons}>
                <li>
                  <a
                    href="https://facebook.com/lineupdesignstudio/"
                    className={styles.socialLink}
                    target="_blank"
                    aria-label="facebook page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.socialImage}
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/lineup_kyiv/?igshid=udhv2um4b8oc"
                    className={styles.socialLink}
                    target="_blank"
                    aria-label="instagram page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.socialImage}
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.tiktok.com/@lineup_kyiv?_t=ZM-8v8hlarOFIU"
                    className={styles.socialLink}
                    target="_blank"
                    aria-label="tiktiok page"
                  >
                    <svg
                      fill="#000000"
                      width="24px"
                      height="24px"
                      viewBox="0 0 512 512"
                      id="icons"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.socialImage}
                    >
                      <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            {/* <X
            className={styles.closeIcon}
            onClick={() => setActiveModal(false)}
          /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
