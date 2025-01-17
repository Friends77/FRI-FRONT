/**
 * ProfilePage: 사용자의 정보를 조회하고 수정할 수 있는 페이지
 * @Author 선우
 */

import PrimaryButton from '@/components/@common/Button/PrimaryButton';
import Dropdown from '@/components/@common/Dropdown';
import Radio from '@/components/@common/Radio';
import ImagePicker from '@/components/auth/ImagePicker';
import InputField from '@/components/auth/InputField';
import { GENDER } from '@/constants/gender';
import { EI, FT, JP, NS } from '@/constants/mbti';
import { BIRTH_YEAR } from '@/constants/year';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Styled from './ProfilePage.styled';

const ProfilePage = () => {
  const methods = useForm();

  const { control } = methods;

  return (
    <>
      <Styled.ProfilePageHeader>마이페이지</Styled.ProfilePageHeader>
      <FormProvider {...methods}>
        <Styled.ProfilePageInnerContainer>
          <Styled.ProfilePageContentSection>
            <Styled.ProfilePageImageContainer>
              <ImagePicker name="imageUrl" />
            </Styled.ProfilePageImageContainer>
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
              />
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel $isRequired={false}>
                나이(출생년도)
              </Styled.ProfilePageLabel>
              <Controller
                control={control}
                name="birth"
                render={() => (
                  <Dropdown name="birth" width="892px" options={BIRTH_YEAR} />
                )}
              />
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel $isRequired={false}>
                성별
              </Styled.ProfilePageLabel>
              <Dropdown width="892px" options={GENDER} name="gender" />
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel>MBTI</Styled.ProfilePageLabel>
              <Styled.ProfilePageMBTIOption>
                <Controller
                  name="EI"
                  control={control}
                  render={() => {
                    return (
                      <Styled.ProfilePageRadio>
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
                      </Styled.ProfilePageRadio>
                    );
                  }}
                />
                <Controller
                  name="NS"
                  control={control}
                  render={() => {
                    return (
                      <Styled.ProfilePageRadio>
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
                      </Styled.ProfilePageRadio>
                    );
                  }}
                />
                <Controller
                  name="FT"
                  control={control}
                  render={() => {
                    return (
                      <Styled.ProfilePageRadio>
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
                      </Styled.ProfilePageRadio>
                    );
                  }}
                />
                <Controller
                  name="JP"
                  control={control}
                  render={() => {
                    return (
                      <Styled.ProfilePageRadio>
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
                      </Styled.ProfilePageRadio>
                    );
                  }}
                />
              </Styled.ProfilePageMBTIOption>
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageInputContainer>
              <Styled.ProfilePageLabel>
                관심사 (1개 이상 선택해주세요)
              </Styled.ProfilePageLabel>
              <Dropdown width="892px" name="interestTag" isMulti={true} />
            </Styled.ProfilePageInputContainer>
            <Styled.ProfilePageButtonSection>
              <PrimaryButton>저장하기</PrimaryButton>
            </Styled.ProfilePageButtonSection>
          </Styled.ProfilePageContentSection>
        </Styled.ProfilePageInnerContainer>
      </FormProvider>
    </>
  );
};

export default ProfilePage;
