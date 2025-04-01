/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from 'react-select';
import ArrowDown from '../../SVG/Icon/ArrowDown';
import Close from '../../SVG/Icon/Close';
import * as Styled from './Dropdown.styled';
import { FieldError, useFormContext } from 'react-hook-form';
import { Options } from '@/types/@common';

export interface IDropdownProps {
  /**
   * Dropdown 전체 컴포넌트(Label + Dropdown 포함)의 너비
   * CSS 단위(px, %, rem 등)를 포함하여 전달
   * @default "320px"
   */
  width?: string;

  /**
   * Dropdown에 표시될 옵션 목록
   * 각 옵션은 value와 label 속성을 포함하는 객체로 구성
   * @example
   * options={[
   *    { value: 1, label: 'Option 1' },
   *    { value: 2, label: 'Option 2' }
   * ]}
   */
  options: Options[];

  /** 선택되지 않은 상태에서 표시할 기본 텍스트 */
  placeholder?: string;

  /**
   * 다중 선택 모드 활성화 여부
   * @default false
   */
  isMulti?: boolean;

  /**
   * react-hook-form의 Controller로부터 전달된 현재 선택된 값
   * - 단일 선택 모드: `Options`
   * - 다중 선택 모드: `Options[]`
   */
  value?: Options | Options[] | null;

  /** 폼에서 사용할 필드 이름 */
  name: string;

  /** 값이 변경될 때 호출되는 핸들러 */
  onChange?: (value: any) => void;

  /** Dropdown의 라벨 */
  label?: string;

  /** 필수 입력 여부 (라벨 옆에 * 표시) */
  isRequired?: boolean;
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
      <Close title="선택 항목 초기화" width="20px" height="20px" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <Close title="선택 항목 삭제" width="20px" height="20px" />
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
      label,
      isRequired,
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
        {label && <Styled.Label $isRequired={isRequired}>{label}</Styled.Label>}
        <Styled.Dropdown
          ref={ref}
          classNamePrefix="dropdown"
          options={options}
          closeMenuOnSelect={isMulti ? false : true}
          hideSelectedOptions={false}
          placeholder={placeholder}
          isSearchable={isMulti ? true : false}
          isMulti={isMulti}
          value={value ?? undefined}
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
