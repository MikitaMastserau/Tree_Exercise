import { useState } from "react";

import styles from "./styles.module.scss";

export const TreeBranch = ({ branch, onAddBranch, onDeleteBranch, level }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleAddBranch = () => {
      const newBranchName = prompt("Please write the name of the new branch:");

      if (newBranchName.trim().length > 0) {
         onAddBranch(branch.id, newBranchName);
         setIsOpen(true);
      }
   };

   const handleDeleteBranch = () => {
      onDeleteBranch(branch.id);
   };

   const branchShift = {
      marginLeft: `${level * 20}px`,
   };

   const stylesForWrapper = (styles.wrapper) + " " + (styles[`level-${level}`]);

   return (
      <div className={stylesForWrapper} style={branchShift}>
         <div className={styles.branch}>
            {branch.children.length > 0 && (
               <button className={styles.branch__openBtn} onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right-fill"></i>}
               </button>
            )}
            <p className={styles.branch__text}>{branch.name}</p>
            <div className="btn-group btn-group-sm">
               <button className="btn btn-outline-secondary" onClick={() => handleAddBranch()}>
                  <i className="bi bi-plus"></i>
               </button>
               <button className="btn btn-outline-secondary" onClick={() => handleDeleteBranch()}>
                  <i className="bi bi-dash"></i>
               </button>
            </div>
         </div>
         <div className={styles.child}>
            {isOpen && branch.children.map((child) => (
               <TreeBranch key={child.id} branch={child} onAddBranch={onAddBranch} onDeleteBranch={onDeleteBranch} />
            ))}
         </div>
      </div>
   );
};