import { forwardRef } from 'react';
import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from 'react-select';
import ArrowDown from '../SVG/Icon/ArrowDown';
import Close from '../SVG/Icon/Close';
import * as Styled from './Dropdown.styled';
import { FieldError, useFormContext } from 'react-hook-form';
import { Options } from '@/types/@common';

/**
 *  @Dropdown
 *    @사용목적
 *      1) 다양한 화면에서 재사용 가능한 Dropdown UI 제공
 *    @주요기능
 *      1) 단일 선택 및 다중 선택 지원
 *      2) react-hook-form과의 통합 지원
 */

export interface IDropdownProps {
  /**
   * 전체 Dropdown 컴포넌트(Label + DropDown 포함)의 가로 길이를 설정
   * CSS 단위(px, %, rem 등)를 포함하여 전달
   * @default "320px"
   */
  width?: string;

  /**
   * Dropdown에 표시할 옵션 배열
   * 각 옵션은 value와 label 속성을 포함하는 객체로 구성
   * - value: 옵션의 실제 값
   * - label: 표시될 텍스트
   * @example
   * options={[
   *    {value: 1, label: 'Option 1'}
   *    {value: 2, label: 'Option 2'}
   * ]}
   */
  options: Options[];

  placeholder?: string;

  /**
   * 다중 선택 모드 활성화 여부 설정
   * @default false
   */
  isMulti?: boolean;

  /** react-hook-form의 Controller로부터 전달된 현재 값 */
  value?: Options | Options[];

  name: string;

  /** react-hook-form의 Controller로부터 전달된 onChange Handler */
  onChange?: (value: any) => void;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { isMulti } = props.selectProps;

  if (isMulti) {
    return null;
  }

  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown title="드롭다운 메뉴 열기" width="24px" height="24px" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <Close title="선택 항목 초기화" width="24px" height="24px" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <Close title="선택 항목 삭제" width="14px" height="14px" />
    </components.MultiValueRemove>
  );
};

const Dropdown = forwardRef<any, IDropdownProps>(
  (
    {
      width = '320px',
      options,
      placeholder,
      isMulti,
      name,
      value,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const {
      formState: { errors },
    } = useFormContext();

    const error = errors[name] as FieldError;

    return (
      <Styled.Wrapper $width={width}>
        <Styled.Dropdown
          ref={ref}
          classNamePrefix="dropdown"
          options={options}
          closeMenuOnSelect={isMulti ? false : true}
          hideSelectedOptions={false}
          placeholder={placeholder}
          isSearchable={isMulti ? true : false}
          isMulti={isMulti}
          value={value}
          $isError={!!error}
          onChange={onChange}
          components={{
            DropdownIndicator,
            ClearIndicator,
            MultiValueRemove,
          }}
          {...rest}
        />
        {error && <Styled.ErrorMsg>{error.message}</Styled.ErrorMsg>}
      </Styled.Wrapper>
    );
  },
);

export default Dropdown;
