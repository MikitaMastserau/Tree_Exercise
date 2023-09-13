import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { TreeLayout } from "../components/TreeLayout";

export const TreeContainer = () => {
   const [branches, setBranches] = useState([]);
   const localStorageKey = "treeData";

   useEffect(() => {
      const storedData = localStorage.getItem(localStorageKey);

      if (storedData) {
         setBranches(JSON.parse(storedData));
      }
   }, []);

   const isNameUnique = (branchName, currentBranch) => {
      if (currentBranch.name === branchName) {
         return false;
      }
      for (const child of currentBranch.children) {
         if (!isNameUnique(branchName, child)) {
            return false;
         }
      }
      return true;
   };

   const createRoot = () => {
      const root = { id: uuid(), name: "Root", children: [] };

      setBranches([root]);

      localStorage.setItem(localStorageKey, JSON.stringify([root]));
   };

   const handleAddBranch = (parentId, branchName) => {
      const isUnique = isNameUnique(branchName, branches[0]);

      if (isUnique) {
         const newBranch = { id: uuid(), name: branchName, children: [] };

         const findBranchAndAdd = (currentBranch) => {
            if (currentBranch.id === parentId) {
               currentBranch.children.push(newBranch);
               return true;
            }
            for (const child of currentBranch.children) {
               if (findBranchAndAdd(child)) {
                  return true;
               }
            }
            return false;
         };

         const updatedBranches = [...branches];

         findBranchAndAdd(updatedBranches[0]);

         setBranches(updatedBranches);

         localStorage.setItem(localStorageKey, JSON.stringify(updatedBranches));
      } else {
         alert("A branch with the same name already exists. Come up with a unique name.");
      }
   };

   const handleDeleteBranch = (branchIdToDelete) => {
      if (branches[0].id === branchIdToDelete) {
         setBranches([]);

         localStorage.removeItem(localStorageKey);

         return;
      }

      const findBranchAndDelete = (currentBranch) => {
         currentBranch.children = currentBranch.children.filter((child) => {
            if (child.id === branchIdToDelete) {
               return false;
            }
            return findBranchAndDelete(child);
         });
         return true;
      };

      const updatedBranches = [...branches];

      findBranchAndDelete(updatedBranches[0]);

      setBranches(updatedBranches);

      localStorage.setItem(localStorageKey, JSON.stringify(updatedBranches));
   };

   return (
      <TreeLayout
         handleAddBranch={handleAddBranch}
         handleDeleteBranch={handleDeleteBranch}
         createRoot={createRoot}
         branches={branches}
      />
   );
};