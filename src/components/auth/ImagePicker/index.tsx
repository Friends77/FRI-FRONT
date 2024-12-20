import { useState } from "react";
import { useFormContext } from "react-hook-form";

export interface IImagePickerProps {
  name: string;
}

const ImagePicker = ({ name }: IImagePickerProps) => {
  const { register, setValue } = useFormContext();

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handleImageDelete = () => {
    setPickedImage(null);
    setValue(name, null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPickedImage(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file);

      setValue(name, file);
    }
  };

  return (
    <div>
      <label>
        {pickedImage ? (
          <img src={pickedImage} alt={`${name} preview`} />
        ) : (
          <p>기본 이미지</p>
        )}
        <input
          id={name}
          type="file"
          {...register(name)}
          onChange={handleImageChange}
          hidden
        />
        <p>이미지</p>
      </label>
      {pickedImage && (
        <button type="button" onClick={handleImageDelete}>
          이미지 삭제
        </button>
      )}
    </div>
  );
};

export default ImagePicker;
