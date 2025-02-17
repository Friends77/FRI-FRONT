import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Styled from './CreateChatRoom.styled';
import InputField from '@/components/auth/InputField';
import { CHAT_ERROR_MSG } from '@/constants/message';
import Dropdown from '@/components/@common/Dropdown';
import { useEffect, useState } from 'react';
import { Options } from '@/types/@common';
import { useFetchCategory } from '@/hooks/auth/useFetchCategory';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import { ICreateChatRoomForm } from '@/types/chat';
import { useCreateChatRoom } from '@/hooks/chat/useCreateChatRoom';
import ImagePicker from '@/components/auth/ImagePicker';
import defaultThumbnail from '@/assets/images/defaultThumbnail.png';
const CreateChatRoom = () => {
  const { data: categories } = useFetchCategory();

  const [categoryOptions, setCategoryOptions] = useState<Options[]>([]);

  const methods = useForm<ICreateChatRoomForm>();

  const { control, handleSubmit } = methods;

  const { mutate: createChatRoom } = useCreateChatRoom();

  useEffect(() => {
    if (categories) {
      const options = categories.map((category) => ({
        value: category.id,
        label:
          category.type === 'SUBJECT'
            ? `${category.image} ${category.name}`
            : category.name,
      }));
      setCategoryOptions(options);
    }
  }, [categories]);

  const onSubmit = (data: ICreateChatRoomForm) => {
    const { categoryIdList } = data;

    const categories = categoryIdList.map(
      (category) => category.value as number,
    );

    createChatRoom({ ...data, categoryIdList: categories });
  };

  return (
    <Styled.CreateChatRoomContainer>
      <Styled.Header>채팅방 만들기</Styled.Header>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <Styled.ThumbnailItem>
              <ImagePicker
                name="backgroundImage"
                usage="signUp"
                defaultImageUrl={defaultThumbnail}
              />
            </Styled.ThumbnailItem>
            <Styled.InputItem>
              <Styled.Label>
                채팅방 이름 <Styled.RequiredTag>*</Styled.RequiredTag>
              </Styled.Label>
              <InputField
                isRequired={true}
                name="title"
                width="100%"
                placeholder="채팅방 이름을 입력해주세요"
                isErrorMsgRelative={true}
                rules={{
                  required: {
                    value: true,
                    message: CHAT_ERROR_MSG.TITLE_REQUIRED,
                  },
                }}
              />
            </Styled.InputItem>
            <Styled.InputItem>
              <Styled.Label>
                채팅방 소개 <Styled.RequiredTag>*</Styled.RequiredTag>
              </Styled.Label>
              <InputField
                isRequired={true}
                name="description"
                width="100%"
                placeholder="채팅방 소개를 입력해주세요"
                isErrorMsgRelative={true}
                rules={{
                  required: {
                    value: true,
                    message: CHAT_ERROR_MSG.DESCRIPTION_REQUIRED,
                  },
                }}
              />
            </Styled.InputItem>
            <Styled.InputItem>
              <Styled.Label>
                채팅방 태그 <Styled.RequiredTag>*</Styled.RequiredTag>
              </Styled.Label>
              <Controller
                name="categoryIdList"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    width="100%"
                    name="tags"
                    options={categoryOptions}
                    isMulti={true}
                    value={field.value}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                    placeholder="채팅방 태그를 선택해주세요"
                  />
                )}
              />
            </Styled.InputItem>
          </ul>
          <Styled.CreateButton>
            <PrimaryButton type="submit">만들기</PrimaryButton>
          </Styled.CreateButton>
        </form>
      </FormProvider>
    </Styled.CreateChatRoomContainer>
  );
};

export default CreateChatRoom;
