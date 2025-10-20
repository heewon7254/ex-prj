import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import { FiDownload } from "react-icons/fi";
import Button from "../../common/Button/Button";

// 다운로드 버튼 호버 시 나오는 거로 수정
// npm uninstall react-icons

const images = [
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    alt: "숲 속 길",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    alt: "해질녘 바다 풍경",
  },
  {
    src: "https://images.unspl ash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    alt: "산 정상의 노을",
  },
];

const MultiModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[photoIndex].src;
    link.download = `image-${photoIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="multi-modal-content">
        {images.map((img, index) => (
          <div key={index} className="multi-modal-content_inner">
            <img
              src={img.src}
              alt={img.alt}
              className="multi-modal-img"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
            <p className="multi-modal-text">{img.alt}</p>
            <Button className="multi-modal-download_btn" label="다운로드"></Button>
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={images.map(img => ({
            src: img.src,
            description: img.alt,
          }))}
          plugins={[Thumbnails]}
          thumbnails={{
            position: "end", // 오른쪽에 썸네일 표시
            width: 100,
            height: 80,
            gap: 8,
            border: 1,
            borderRadius: 4,
          }}
          render={{
            toolbar: ({ slide }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                  padding: "8px 16px",
                }}
              >
                <span>{slide?.description}</span>
                {/* <FiDownload
                  size={24}
                  color="white"
                  style={{ cursor: "pointer" }}
                  onClick={handleDownload}
                /> */}
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};

export default MultiModal;
