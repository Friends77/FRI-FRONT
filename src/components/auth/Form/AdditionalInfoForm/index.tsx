/**
 * MBTI, 한 줄 소개, 관심사 입력 폼
 */

import { fetchCategory } from '@/apis/auth';
import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import CheckBox from '@/components/@common/Checkbox';
import Radio from '@/components/@common/Radio';
import { EI, FT, JP, NS } from '@/constants/mbti';
import { useGeoLocation } from '@/hooks/auth/useGeoLocation';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { Theme } from '@/styles/theme';
import { moveToStep } from '@/utils/step/moveSteps';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import InputField from '../../InputField';
import * as Styled from './AdditionalInfoForm.styled';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const AdditionalInfoForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);

  useGeoLocation(geolocationOptions);

  // 관심사 조회
  const { data: categorys } = useQuery({
    queryKey: ['categorys'],
    queryFn: fetchCategory,
  });

  const {
    control,
    formState: { isValid },
  } = useFormContext();
  return (
    <Styled.AIFormWrapper>
      <Styled.AIFormHeader>프로필 작성</Styled.AIFormHeader>
      <Styled.AIFormContentSection>
        <Styled.AIFormMBTISection>
          <Styled.AIFormLabel>MBTI</Styled.AIFormLabel>
          <Styled.AIFormMBTIOption>
            <Controller
              name="EI"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {EI.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="EI"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="NS"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {NS.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="NS"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="FT"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {FT.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="FT"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
            <Controller
              name="JP"
              control={control}
              render={() => {
                return (
                  <Styled.AIFormRadio>
                    {JP.map((option) => {
                      return (
                        <Radio
                          key={option.label}
                          name="JP"
                          text={option.label}
                          value={option.value}
                        />
                      );
                    })}
                  </Styled.AIFormRadio>
                );
              }}
            />
          </Styled.AIFormMBTIOption>
        </Styled.AIFormMBTISection>
        <InputField
          label="한 줄 소개"
          name="selfDescription"
          placeholder="한 줄 소개를 적어주세요"
          isErrorMsgRelative={true}
          boldLabel={true}
          labelColor="Gray_1000"
        />
        <Styled.AIFormTagSection>
          <Styled.AIFormLabel>
            관심사 (1개 이상 선택해주세요)
          </Styled.AIFormLabel>
          <Styled.AIFormCheckBoxSection>
            <Styled.AIFormColumnSection>
              {/* 관심사 영역 */}
              {categorys && (
                <Controller
                  name="interestTag"
                  render={() => (
                    <>
                      {categorys.map((category) => {
                        if (category.type === 'SUBJECT') {
                          return (
                            <CheckBox
                              key={category.id}
                              name="interestTag"
                              text={`${category.image}${category.name}`}
                              value={+category.id}
                            />
                          );
                        }
                      })}
                    </>
                  )}
                />
              )}
            </Styled.AIFormColumnSection>
            <Styled.AIFormColumnSection>
              {/* 지역 영역 */}
              {categorys && (
                <Controller
                  name="interestTag"
                  render={() => (
                    <>
                      {categorys.map((category) => {
                        if (category.type === 'REGION') {
                          return (
                            <CheckBox
                              key={category.id}
                              name="interestTag"
                              text={category.name}
                              value={+category.id}
                            />
                          );
                        }
                      })}
                    </>
                  )}
                />
              )}
            </Styled.AIFormColumnSection>
          </Styled.AIFormCheckBoxSection>
        </Styled.AIFormTagSection>
        <Styled.AIFormButtonSection>
          <PrimaryButton
            width="160px"
            style={{
              backgroundColor: Theme.colors.Gray_200,
              color: Theme.colors.Gray_800,
            }}
            onClick={() => moveToStep('prev', setSignUpStep)}
          >
            이전
          </PrimaryButton>
          <PrimaryButton disabled={!isValid}>확인</PrimaryButton>
        </Styled.AIFormButtonSection>
      </Styled.AIFormContentSection>
    </Styled.AIFormWrapper>
  );
};

export default AdditionalInfoForm;
