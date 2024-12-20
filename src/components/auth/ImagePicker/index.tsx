import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface IImagePickerProps {
  name: string;
}

const ImagePicker = ({ name }: IImagePickerProps) => {
  const { register, setValue } = useFormContext();

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      setValue(name, null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);

    setValue(name, file);
  };

  return (
    <div>
      <div>
        {pickedImage ? (
          <img src={pickedImage} alt={`${name} preview`} />
        ) : (
          <p>기본 이미지</p>
        )}
      </div>
      <input
        id={name}
        type="file"
        {...register(name)}
        ref={imageInput}
        onChange={handleImageChange}
        hidden
      />
      <button type="button" onClick={handleButtonClick}>
        이미지 변경
      </button>
    </div>
  );
};

export default ImagePicker;
