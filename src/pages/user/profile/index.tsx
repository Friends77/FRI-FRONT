import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Form/Dropdown';
import Radio from '@/components/@common/Form/Radio';
import ImagePicker from '@/components/@common/ImagePicker';
import InputField from '@/components/@common/Form/InputField';
import { ALERT_MESSAGE, AUTH_ERROR_MESSAGE } from '@/constants/message';
import { AUTH_PATTERN } from '@/constants/pattern';
import { useCheckAvailability } from '@/hooks/auth/useCheckAvailability';
import useGetCategory from '@/hooks/@common/useGetCategory';
import { Options } from '@/types/@common';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import * as Styled from './ProfilePage.styled';
import { BIRTH_YEAR } from '@/constants/user/year';
import { GENDER } from '@/constants/user/gender';
import { EI, FT, JP, NS } from '@/constants/user/mbti';
import useGetMyProfile from '@/hooks/user/useGetMyProfile';
import { transformTags } from '@/constants/user/tag';
import { BIRTH_MONTH } from '@/constants/user/month';
import { getDaysInMonth } from '@/utils/date';
import useUpdateProfile from '@/hooks/user/useUpdateProfile';
import { IUpdateProfileForm, IUpdateProfileFormRequest } from '@/types/user';
import { AvailabilityType } from '@/types/auth';

const ProfilePage = () => {
  const { data: myProfile } = useGetMyProfile();

  const { data: categories } = useGetCategory();

  const { mutate: updateProfile } = useUpdateProfile();

  const methods = useForm<IUpdateProfileForm>({
    mode: 'onChange',
  });

  const {
    control,
    reset,
    getValues,
    setValue,
    formState: { isValid, isDirty },
    getFieldState,
    handleSubmit,
  } = methods;

  const nickname = useWatch({ name: 'nickname', control });

  // 닉네임 유효성 검사
  const { data: nicknameAvailability } = useCheckAvailability({
    type: AvailabilityType.nickname,
    value: nickname,
  });

  const [categoryOptions, setCategoryOptions] = useState<Options[]>([]);

  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  // 사용자의 생년, 생월에 해당하는 일 세팅
  const [dayOptions, setDayOptions] = useState<Options[]>([
    {
      value: '',
      label: '',
    },
  ]);

  // 전체 카테고리 옵션 세팅
  useEffect(() => {
    if (categories) {
      setCategoryOptions(transformTags(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (myProfile) {
      const [year, month, day] = myProfile.birth.split('-');

      const [EI, NS, FT, JP] = myProfile.mbti.split('');

      reset({
        nickname: myProfile.nickname,
        imageUrl: myProfile.imageUrl,
        selfDescription: myProfile.selfDescription,
        year,
        month,
        day,
        gender: myProfile.gender,
        EI,
        NS,
        FT,
        JP,
        tags: transformTags(myProfile.interestTag),
      });

      setDayOptions(getDaysInMonth(+year, +month));
    }
  }, [myProfile, reset]);

  const handleVerifyNicknameValidate = async (value: string) => {
    if (
      myProfile?.nickname !== value &&
      nicknameAvailability &&
      !nicknameAvailability.isValid
    ) {
      return nicknameAvailability.message;
    }

    return true;
  };

  const handleEditNickname = () => {
    alert(ALERT_MESSAGE.NICKNAME_CHANGED);
    setHasClickedEdit(true);
  };

  const handleBirthMonthChange = (month: string) => {
    setDayOptions(getDaysInMonth(+getValues('year'), +month));
    setValue('day', '');
  };

  const onSubmit = (data: IUpdateProfileForm) => {
    const { year, month, day, EI, NS, FT, JP, tags, ...rest } = data;

    const requestPayload: IUpdateProfileFormRequest = {
      ...rest,
      birth: `${year}-${month}-${day}`,
      mbti: `${EI}${NS}${FT}${JP}`,
      interestTag: tags?.map((option) => option.value),
    };

    updateProfile(requestPayload);
  };

  return (
    <Styled.ProfileContainer>
      <Styled.ProfilePageHeader>마이페이지</Styled.ProfilePageHeader>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.ProfilePageContentSection>
            <Styled.ProfilePageImageContainer>
              <ImagePicker
                name="imageUrl"
                usage="private"
                imageUrl={myProfile?.imageUrl}
              />
            </Styled.ProfilePageImageContainer>
            <Styled.ProfilePageInputWithMargin>
              <Styled.ProfilePageLabel>닉네임</Styled.ProfilePageLabel>
              <Styled.NickNameSection>
                <InputField
                  type="text"
                  isRequired={true}
                  name="nickname"
                  width="100%"
                  placeholder="닉네임을 입력해주세요"
                  isErrorMsgRelative={true}
                  rules={{
                    required: {
                      value: true,
                      message: AUTH_ERROR_MESSAGE.NICKNAME_REQUIRED,
                    },
                    pattern: {
                      value: AUTH_PATTERN.NICKNAME,
                      message: AUTH_ERROR_MESSAGE.NICKNAME_PATTERN,
                    },
                    validate: handleVerifyNicknameValidate,
                  }}
                />
                <Styled.UpdateNickNameBtn
                  type="button"
                  disabled={
                    // 변경 되었거나 유효한 닉네임일 때만 버튼 활성화
                    !getFieldState('nickname').isDirty ||
                    getFieldState('nickname').invalid ||
                    hasClickedEdit
                  }
                  onClick={handleEditNickname}
                >
                  변경하기
                </Styled.UpdateNickNameBtn>
              </Styled.NickNameSection>
            </Styled.ProfilePageInputWithMargin>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel $isRequired={true}>
                한 줄 소개&nbsp;
              </Styled.ProfilePageLabel>
              <InputField
                type="text"
                isRequired={true}
                name="selfDescription"
                width="100%"
                placeholder="한 줄 소개를 입력해주세요."
                isErrorMsgRelative={true}
                rules={{
                  required: {
                    value: true,
                    message: AUTH_ERROR_MESSAGE.SELF_DESCRIPTION_REQUIRED,
                  },
                }}
              />
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel $isRequired={false}>
                나이
              </Styled.ProfilePageLabel>
              <Styled.ProfilePageBirthSection>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      width="200px"
                      name="year"
                      options={BIRTH_YEAR}
                      placeholder="출생년도를 선택해주세요"
                      value={BIRTH_YEAR.find(
                        (year) => year.label === field.value,
                      )}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                    />
                  )}
                />
                <Controller
                  name="month"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      width="150px"
                      name="month"
                      options={BIRTH_MONTH}
                      placeholder="월"
                      value={BIRTH_MONTH.find(
                        (month) => month.value === field.value,
                      )}
                      onChange={(e) => {
                        field.onChange(e.value);
                        handleBirthMonthChange(e.value);
                      }}
                    />
                  )}
                />
                <Controller
                  name="day"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: '일자를 선택해주세요',
                    },
                  }}
                  render={({ field }) => (
                    <Dropdown
                      width="150px"
                      name="day"
                      options={dayOptions}
                      placeholder="일"
                      value={dayOptions.find(
                        (day) => day.value === field.value,
                      )}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                    />
                  )}
                />
              </Styled.ProfilePageBirthSection>
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputWithMargin>
              <Styled.ProfilePageLabel $isRequired={false}>
                성별
              </Styled.ProfilePageLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    width="100%"
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
            </Styled.ProfilePageInputWithMargin>
            <Styled.ProfilePageInputWithMargin>
              <Styled.ProfilePageLabel>MBTI</Styled.ProfilePageLabel>
              <Styled.ProfilePageMBTIOption>
                <Styled.ProfilePageRadio>
                  {EI.map((option) => {
                    return (
                      <Radio
                        key={option.label}
                        name="EI"
                        label={option.label}
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
                        label={option.label}
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
                        label={option.label}
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
                        label={option.label}
                        value={option.label}
                      />
                    );
                  })}
                </Styled.ProfilePageRadio>
              </Styled.ProfilePageMBTIOption>
            </Styled.ProfilePageInputWithMargin>
            <Styled.ProfilePageInputWithMargin>
              <Styled.ProfilePageLabel>
                관심사 (1개 이상 선택해주세요)
              </Styled.ProfilePageLabel>
              <Controller
                name="tags"
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
                  />
                )}
              />
            </Styled.ProfilePageInputWithMargin>
            <Styled.ProfilePageButtonSection>
              <PrimaryButton
                type="submit"
                disabled={
                  !isValid ||
                  !isDirty ||
                  (getFieldState('nickname').isDirty && !hasClickedEdit)
                }
              >
                저장하기
              </PrimaryButton>
            </Styled.ProfilePageButtonSection>
          </Styled.ProfilePageContentSection>
        </form>
      </FormProvider>
    </Styled.ProfileContainer>
  );
};

export default ProfilePage;
