import SVG, { ISVG } from '..';

const SettingFill = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_1929_666"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1929_666)">
        <path
          d="M10.96 21C10.728 21 10.5264 20.9237 10.3553 20.7712C10.1841 20.6186 10.078 20.4282 10.037 20.2L9.77353 18.1077C9.45436 18.0116 9.10919 17.8603 8.73803 17.6538C8.36686 17.4474 8.05119 17.2263 7.79103 16.9905L5.87552 17.8135C5.66403 17.907 5.44927 17.9173 5.23127 17.8443C5.01327 17.7711 4.84536 17.6326 4.72752 17.4288L3.64852 15.5712C3.53069 15.3674 3.49611 15.1546 3.54477 14.9327C3.59344 14.7109 3.70944 14.5288 3.89277 14.3865L5.56402 13.1365C5.53452 12.9558 5.51019 12.7697 5.49102 12.578C5.47169 12.3863 5.46203 12.2001 5.46203 12.0192C5.46203 11.8512 5.47169 11.6747 5.49102 11.4895C5.51019 11.3042 5.53452 11.0955 5.56402 10.8635L3.89277 9.6135C3.70944 9.47117 3.59661 9.28592 3.55427 9.05775C3.51211 8.82958 3.54994 8.6135 3.66777 8.4095L4.72752 6.6095C4.84536 6.4185 5.01327 6.28325 5.23127 6.20375C5.44927 6.12425 5.66403 6.13133 5.87552 6.225L7.77178 7.02875C8.07044 6.78008 8.39353 6.55575 8.74103 6.35575C9.08836 6.15575 9.42611 6.00125 9.75428 5.89225L10.037 3.8C10.078 3.57183 10.1841 3.38142 10.3553 3.22875C10.5264 3.07625 10.728 3 10.96 3H13.041C13.273 3 13.4746 3.07625 13.6458 3.22875C13.8169 3.38142 13.923 3.57183 13.964 3.8L14.2275 5.9115C14.6109 6.04617 14.9496 6.20067 15.2438 6.375C15.5379 6.54933 15.8409 6.76725 16.1525 7.02875L18.1448 6.225C18.3563 6.13133 18.571 6.12425 18.789 6.20375C19.007 6.28325 19.1749 6.4185 19.2928 6.6095L20.3525 8.42875C20.4704 8.63258 20.5049 8.84542 20.4563 9.06725C20.4076 9.28908 20.2916 9.47117 20.1083 9.6135L18.36 10.9212C18.4152 11.1276 18.446 11.317 18.4525 11.4895C18.4589 11.6618 18.462 11.832 18.462 12C18.462 12.1552 18.4556 12.3189 18.4428 12.4913C18.4299 12.6637 18.4004 12.8724 18.3543 13.1173L20.0448 14.3865C20.2281 14.5288 20.3474 14.7109 20.4025 14.9327C20.4575 15.1546 20.4261 15.3674 20.3083 15.5712L19.2428 17.4095C19.1249 17.6135 18.9538 17.752 18.7293 17.825C18.5049 17.898 18.287 17.8878 18.0755 17.7943L16.1525 16.9712C15.8409 17.2327 15.5274 17.4571 15.212 17.6443C14.8967 17.8314 14.5685 17.9795 14.2275 18.0885L13.964 20.2C13.923 20.4282 13.8169 20.6186 13.6458 20.7712C13.4746 20.9237 13.273 21 13.041 21H10.96ZM11.9735 14.5C12.671 14.5 13.2621 14.2577 13.7468 13.773C14.2313 13.2885 14.4735 12.6975 14.4735 12C14.4735 11.3025 14.2313 10.7115 13.7468 10.227C13.2621 9.74233 12.671 9.5 11.9735 9.5C11.2724 9.5 10.6804 9.74233 10.1975 10.227C9.71486 10.7115 9.47353 11.3025 9.47353 12C9.47353 12.6975 9.71486 13.2885 10.1975 13.773C10.6804 14.2577 11.2724 14.5 11.9735 14.5Z"
          fill="white"
        />
      </g>
    </SVG>
  );
};

export default SettingFill;
