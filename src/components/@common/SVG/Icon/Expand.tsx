import SVG, { ISVG } from '..';

const Expand = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_1714_736"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="33"
        height="32"
      >
        <rect x="0.5" width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1714_736)">
        <path
          d="M9.83333 22.6667H14.5C14.6889 22.6667 14.8472 22.7307 14.975 22.8587C15.1028 22.9867 15.1667 23.1452 15.1667 23.3343C15.1667 23.5234 15.1028 23.6817 14.975 23.809C14.8472 23.9363 14.6889 24 14.5 24H9.577C9.27189 24 9.01611 23.8968 8.80967 23.6903C8.60322 23.4839 8.5 23.2281 8.5 22.923V18C8.5 17.8111 8.564 17.6528 8.692 17.525C8.82 17.3972 8.97856 17.3333 9.16767 17.3333C9.35678 17.3333 9.515 17.3972 9.64233 17.525C9.76967 17.6528 9.83333 17.8111 9.83333 18V22.6667ZM23.1667 9.33333H18.5C18.3111 9.33333 18.1528 9.26933 18.025 9.14133C17.8972 9.01333 17.8333 8.85478 17.8333 8.66567C17.8333 8.47655 17.8972 8.31833 18.025 8.191C18.1528 8.06367 18.3111 8 18.5 8H23.423C23.7281 8 23.9839 8.10322 24.1903 8.30967C24.3968 8.51611 24.5 8.77189 24.5 9.077V14C24.5 14.1889 24.436 14.3472 24.308 14.475C24.18 14.6028 24.0214 14.6667 23.8323 14.6667C23.6432 14.6667 23.485 14.6028 23.3577 14.475C23.2303 14.3472 23.1667 14.1889 23.1667 14V9.33333Z"
          fill="#1C1B1F"
        />
      </g>
    </SVG>
  );
};

export default Expand;
