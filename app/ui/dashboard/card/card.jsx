import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {
  return (
    <>
      <div className={styles.container}>
        <MdSupervisedUserCircle size={24} />
        <div className={styles.texts}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.number}>{item.getNumber()}</span>
          <span className={styles.detail}>
            <span className={item.getChange() >= 0 ? styles.positive : styles.negative}>
              {item.getChange()}%
            </span>{" "}
            {item.getChange() >= 0 ? "more" : "less"} than previous week
          </span>
        </div>

      </div>
    </>
  );
};

export default Card;
