export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** text: 버튼에 사용될 텍스트, 버튼의 주요 라벨로 사용 */
  text?: string;
  /** disable: 버튼의 비활성화 여부를 제어하는 property, default: false */
  disable?: boolean;
}

/**
 *  @Button
 *    @사용목적
 *      1) 사용자 상호작용: 버튼을 통해 사용자가 클릭 이벤트를 트리거하여 특정 작업
 *      2) UI 구성 요소의 일관성 유지: 버튼 스타일과 동직을 통일함으로써 UI 일관성 제공
 *      3) 재사용성 향상
 *    @주요기능
 *      1) 클릭 이벤트 처리: 버튼 클릭 시 특정 작업(이벤트 핸들러 실행)을 수행
 */

const Button = ({ disable, text, ...rest }: IButtonProps) => {
  return (
    <button disabled={disable} {...rest}>
      {text}
    </button>
  );
};

export default Button;
