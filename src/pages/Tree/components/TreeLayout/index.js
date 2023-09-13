import { TreeBranch } from "../TreeBranch";

import styles from "./styles.module.scss";

export const TreeLayout = ({ handleAddBranch, handleDeleteBranch, createRoot, branches }) => {
   return (
      <div className={styles.wrapper}>
         {branches.length === 0 ? (
            <button className="btn btn-outline-info btn-lg" onClick={() => createRoot()}>Create root</button>
         ) : (
            branches.map((branch) => (
               <TreeBranch
                  key={branch.id}
                  branch={branch}
                  onAddBranch={handleAddBranch}
                  onDeleteBranch={handleDeleteBranch}
               />
            ))
         )}
      </div>
   );
};