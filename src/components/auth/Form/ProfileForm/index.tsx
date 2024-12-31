import Button from '@/components/@common/Button/Button';
import signUpStepAtom from '@/recoil/auth/signUp/atom';
import { moveToStep } from '@/utils/step/moveSteps';
import { useSetRecoilState } from 'recoil';

const ProfileForm = () => {
  const setSignUpStep = useSetRecoilState(signUpStepAtom);
  return (
    <>
      <Button type="button" onClick={() => moveToStep('prev', setSignUpStep)}>
        뒤로
      </Button>
    </>
  );
};

export default ProfileForm;
