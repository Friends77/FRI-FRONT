/**
 * ProfilePage: 사용자의 정보를 조회하고 수정할 수 있는 페이지
 * @Author 선우
 */

import { updateProfile } from '@/apis/user';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Dropdown';
import Radio from '@/components/@common/Radio';
import ImagePicker from '@/components/auth/ImagePicker';
import InputField from '@/components/auth/InputField';
import { GENDER } from '@/constants/gender';
import { EI, FT, JP, NS } from '@/constants/mbti';
import { AUTH_ERROR_MSG } from '@/constants/message';
import { BIRTH_YEAR } from '@/constants/year';
import { useFetchCategory } from '@/hooks/auth/useFetchCategory';
import { useProfile } from '@/hooks/user/useProfile';
import { Options } from '@/types/@common';
import { UpdateProfileDataType } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import * as Styled from './ProfilePage.styled';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useCheckAvailability } from '@/hooks/auth/useCheckAvailability';

const ProfilePage = () => {
  const [categoryOptions, setCategoryOptions] = useState<Options[]>([]);
  const [selectedTags, setSelectedTags] = useState<Options[]>([]);

  // 닉네임 변경하기 버튼 클릭 여부 상태
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  // 사용자 정보 조회 및 MBTI 재가공
  const { data: userData } = useProfile();
  const letters = userData.mbti.split('');

  // 닉네임 유효성 검사
  const { mutateAsync: verifyNickname } = useCheckAvailability();

  const handleVerifyNicknameValidate = async (value: string) => {
    const { isValid, message } = await verifyNickname({
      type: 'nickname',
      value,
    });

    // 원래 닉네임과 같으면 유효성 검사 실시하지 않음
    if (userData.nickname !== value && !isValid) {
      return message;
    }

    return true;
  };

  const handleEditNickname = () => {
    alert('닉네임이 변경되었습니다! 저장을 완료해주세요.');
    setHasClickedEdit(true);
  };

  // 카테고리 조회
  const { data: categories } = useFetchCategory();

  // 전체 카테고리 옵션 세팅
  useEffect(() => {
    if (categories) {
      const options = categories.map((category) => ({
        value: category.id,
        label:
          category.type === 'SUBJECT'
            ? `${category.image} ${category.name}`
            : `${category.name}`,
      }));
      setCategoryOptions(options);
    }
  }, [categories]);

  // 사용자가 선택한 카테고리 옵션 세팅
  useEffect(() => {
    if (userData) {
      const userSelectedTags = userData.interestTag.map((tag) => ({
        value: tag.id,
        label:
          tag.type === 'SUBJECT' ? `${tag.image} ${tag.name}` : `${tag.name}`,
      }));
      setSelectedTags(userSelectedTags);

      reset({
        ...methods.getValues(),
        tags: userSelectedTags,
      });
    }
  }, [userData]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: userData.nickname,
      imageUrl: userData.imageUrl,
      selfDescription: userData.selfDescription,
      birth: +userData.birth.substring(0, 4),
      gender: userData.gender,
      EI: letters[0],
      NS: letters[1],
      FT: letters[2],
      JP: letters[3],
      tags: selectedTags,
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid, isDirty },
    getFieldState,
  } = methods;

  // 프로필 수정 react-query
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert('변경 되었습니다.');
      location.reload();
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileDataType> = (data) => {
    const { EI, FT, JP, NS, tags, ...filteredData } = data;

    const selectedTags = tags?.map((option) => option.value);

    const formData = {
      ...filteredData,
      mbti: `${EI}${NS}${FT}${JP}`,
      interestTag: selectedTags,
      location: {
        latitude: userData.location.latitude,
        longitude: userData.location.longitude,
      },
    };

    mutate(formData);
  };

  return (
    <>
      <Styled.ProfilePageHeader>마이페이지</Styled.ProfilePageHeader>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.ProfilePageInnerContainer>
            <Styled.ProfilePageContentSection>
              <Styled.ProfilePageImageContainer>
                <ImagePicker name="imageUrl" usage="myPage" />
              </Styled.ProfilePageImageContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel>닉네임</Styled.ProfilePageLabel>
                <Styled.NickNameSection>
                  <InputField
                    isRequired={true}
                    name="nickname"
                    width="774px"
                    placeholder="닉네임을 입력해주세요"
                    isErrorMsgRelative={true}
                    rules={{
                      required: {
                        value: true,
                        message: AUTH_ERROR_MSG.NICKNAME_REQUIRED,
                      },
                      pattern: {
                        value: AUTH_PATTERN.NICKNAME,
                        message: AUTH_ERROR_MSG.NICKNAME_PATTERN,
                      },
                      validate: handleVerifyNicknameValidate,
                    }}
                  />
                  <Styled.UpdateNickNameBtn
                    type="button"
                    disabled={
                      // 변경 되었거나 유효한 닉네임일 때만 버튼 활성화
                      !getFieldState('nickname').isDirty ||
                      getFieldState('nickname').invalid
                    }
                    onClick={handleEditNickname}
                  >
                    변경하기
                  </Styled.UpdateNickNameBtn>
                </Styled.NickNameSection>
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel $isRequired={true}>
                  한 줄 소개&nbsp;
                </Styled.ProfilePageLabel>
                <InputField
                  isRequired={true}
                  name="selfDescription"
                  width="892px"
                  placeholder="한 줄 소개를 입력해주세요."
                  isErrorMsgRelative={true}
                  rules={{
                    required: {
                      value: true,
                      message: AUTH_ERROR_MSG.SELF_DESCRIPTION_REQUIRED,
                    },
                  }}
                />
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel $isRequired={false}>
                  나이(출생년도)
                </Styled.ProfilePageLabel>
                <Controller
                  name="birth"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      width="892px"
                      name="birth"
                      options={BIRTH_YEAR}
                      placeholder="출생년도를 선택해주세요"
                      value={BIRTH_YEAR.find(
                        (year) => year.value === field.value,
                      )}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  )}
                />
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel $isRequired={false}>
                  성별
                </Styled.ProfilePageLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      width="892px"
                      name="gender"
                      options={GENDER}
                      placeholder="성별을 선택해주세요"
                      value={GENDER.find(
                        (gender) => gender.value === field.value,
                      )}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  )}
                />
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel>MBTI</Styled.ProfilePageLabel>
                <Styled.ProfilePageMBTIOption>
                  <Styled.ProfilePageRadio>
                    {EI.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="EI"
                          text={option.label}
                          value={option.label}
                        />
                      );
                    })}
                  </Styled.ProfilePageRadio>
                  <Styled.ProfilePageRadio>
                    {NS.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="NS"
                          text={option.label}
                          value={option.label}
                        />
                      );
                    })}
                  </Styled.ProfilePageRadio>
                  <Styled.ProfilePageRadio>
                    {FT.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="FT"
                          text={option.label}
                          value={option.label}
                        />
                      );
                    })}
                  </Styled.ProfilePageRadio>
                  <Styled.ProfilePageRadio>
                    {JP.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="JP"
                          text={option.label}
                          value={option.label}
                        />
                      );
                    })}
                  </Styled.ProfilePageRadio>
                </Styled.ProfilePageMBTIOption>
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageInputContainer>
                <Styled.ProfilePageLabel>
                  관심사 (1개 이상 선택해주세요)
                </Styled.ProfilePageLabel>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      width="892px"
                      name="tags"
                      options={categoryOptions}
                      isMulti={true}
                      value={field.value}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                      }
                    />
                  )}
                />
              </Styled.ProfilePageInputContainer>
              <Styled.ProfilePageButtonSection>
                <PrimaryButton
                  type="submit"
                  disabled={!isValid || !isDirty || !hasClickedEdit}
                >
                  저장하기
                </PrimaryButton>
              </Styled.ProfilePageButtonSection>
            </Styled.ProfilePageContentSection>
          </Styled.ProfilePageInnerContainer>
        </form>
      </FormProvider>
    </>
  );
};

export default ProfilePage;
