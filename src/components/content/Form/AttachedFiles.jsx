import { useCallback } from "react";

import AttachedFileItem from "./AttachedFileItem";
import Button from "../../common/Button/Button";

const AttachedFiles = ({ files, onRemoveFile }) => {
  const handleRemoveAll = useCallback(() => {
    if (onRemoveFile) onRemoveFile(null); // null이면 전체 삭제
  }, [onRemoveFile]);

  if (!files || files.length === 0) return null;

  return (
    <div className="attached-files">
      <div className="attached-file-header">
        <Button className="attached-file-header-remove-all" onClick={handleRemoveAll}>
          모두삭제
        </Button>
      </div>
      <div className="attached-file-list">
        {files.map((file, idx) => (
          <AttachedFileItem
            key={idx}
            file={file}
            onRemove={() => onRemoveFile(file)}
            className={files.length >= 2 ? "file-name-ellipsis" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default AttachedFiles;
