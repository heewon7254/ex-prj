import Button from "../../common/Button/Button";
// import { ClipIcon } from "../../../assets/components/file/ClipIcon";
// import { DocumentIcon } from "../../../assets/components/file/DocumentIcon";
import { FileDeleteIcon } from "../../../assets/components/file/FileDeleteIcon";
import { DocIcon } from "../../../assets/components/file/DocIcon";
import { DefaultFileIcon } from "../../../assets/components/file/DefaultFileIcon";
import { HwpIcon } from "../../../assets/components/file/HwpIcon";
import { PdfIcon } from "../../../assets/components/file/pdfIcon";
import { PptIcon } from "../../../assets/components/file/PptIcon";
import { TxtIcon } from "../../../assets/components/file/TxtIcon";
import { XlsIcon } from "../../../assets/components/file/XlsIcon";

const AttachedFileItem = ({ file, onRemove, className }) => {
  function formatFileSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  }

  const fileIconMap = {
    ppt: PptIcon,
    pptx: PptIcon,
    hwp: HwpIcon,
    hwpx: HwpIcon,
    pdf: PdfIcon,
    txt: TxtIcon,
    doc: DocIcon,
    docx: DocIcon,
    xls: XlsIcon,
    xlsx: XlsIcon,
  };

  function getFileIcon(fileType) {
    const ext = fileType.split("/").pop().replace("haansoft", "").toLowerCase();
    const IconComponent = fileIconMap[ext] || ClipIcon;
    return <IconComponent />;
  }

  return (
    <div className="attached-file-item">
      <div className="attached-file-info">
        <span className="attached-file-icon">
          {/* 파일유형에 따라 아이콘 렌더링 다르게, ClipIcon: txt, DocumentIcon:ppt - 아이콘 추가..필요해보임, 디폴트는 ClipIcon */}
          {/* <DocumentIcon /> */}
          {getFileIcon(file.type)}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <span className={`attached-file-name ${className}`}>{file.name}</span>
            <span className="attached-file-size">{formatFileSize(file.size)}</span>
          </div>
          <span className="attached-file-type">
            {file.type.split("/").pop().replace("haansoft", "")}
          </span>
        </div>
      </div>
      <Button
        className="attached-file-remove"
        iconComponent={<FileDeleteIcon />}
        onClick={onRemove}
      />
    </div>
  );
};

export default AttachedFileItem;
