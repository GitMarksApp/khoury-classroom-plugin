import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { buildTree, renderTree } from "./funcs";

import "./styles.css";

/****************
 * TREE COMPONENT
 ****************/
export const FileTree: React.FC<IFileTree> = ({
  gitTree,
  selectFileCallback,
  children,
  className,
  ...props
}) => {
  const fileTree = buildTree(gitTree);

  return (
    <div className={"FileTree" + (className ? " " + className : "")} {...props}>
      {Object.entries(fileTree.childNodes).map(([name, node]) =>
        renderTree(node, name, selectFileCallback)
      )}
      {children}
    </div>
  );
};

/*********************
 * DIRECTORY COMPONENT
 *********************/
export const FileTreeDirectory: React.FC<IFileTreeDirectory> = ({
  name,
  children,
  className,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={"FileTreeDirectory" + (className ? " " + className : "")}
      {...props}
    >
      <div
        className="FileTreeDirectory__name"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronDown />} {name}
      </div>
      <div
        className={
          "FileTreeDirectory__children" +
          (collapsed ? " FileTreeDirectory--collapsed" : "")
        }
      >
        {children}
      </div>
    </div>
  );
};

/****************
 * FILE COMPONENT
 ****************/
export const FileTreeFile: React.FC<IFileTreeFile> = ({
  name,
  className,
  ...props
}) => {
  return (
    <div
      className={"FileTreeFile" + (className ? " " + className : "")}
      {...props}
    >
      {name}
    </div>
  );
};

export { buildTree, renderTree };
export default FileTree;
