import { FaTachometerAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdFactCheck, MdEditDocument } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SelectedClassroomContext } from "@/contexts/selectedClassroom";
import Button from "../../Button";
import { useContext } from "react";
import "./styles.css";

const LeftNav: React.FC = () => {
  const navItems = [
    { name: "Dashboard", dest: "/app/dashboard", Icon: FaTachometerAlt },
    { name: "Grading", dest: "/app/grading", Icon: MdFactCheck },
    { name: "Assignments", dest: "/app/assignments", Icon: MdEditDocument },
    { name: "Settings", dest: "/app/settings", Icon: FaGear },
  ];

  const { selectedClassroom } = useContext(SelectedClassroomContext);

  return (
    <div className="LeftNav">
      <div className="LeftNav__appLogo">
      <svg
          viewBox="0 0 955 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M111.999 4.22113C110.926 2.30985 109.139 0.902804 107.029 0.309372C105.983 0.0148884 104.889 -0.0704996 103.81 0.0580899C102.731 0.186679 101.688 0.526723 100.741 1.05877C99.7935 1.59082 98.9603 2.30444 98.2889 3.15879C97.6176 4.01315 97.1213 4.99148 96.8283 6.03783C96.8283 6.03783 95.3051 10.5995 94.4905 13.8124L110.42 19.3333L112.749 10.5016C113.342 8.39146 113.072 6.13242 111.999 4.22113ZM108.281 24.809C108.281 24.809 79.2288 133.393 78.4525 135.361C77.6762 137.329 69.0469 144.819 69.0469 144.819C66.558 146.946 65.6559 146.068 64.885 143.236C64.885 143.236 62.5332 134.759 62.5318 130.897C62.5305 127.035 92.4878 19.3334 92.4878 19.3334L108.281 24.809ZM49.182 26.9584C50.7316 28.5085 51.6022 30.6107 51.6022 32.8026C51.6022 34.9945 50.7316 37.0966 49.182 38.6467L19.961 67.8759L49.182 97.0968C49.95 97.8643 50.5593 98.7756 50.9752 99.7785C51.391 100.781 51.6052 101.857 51.6056 102.942C51.606 104.028 51.3925 105.103 50.9774 106.106C50.5623 107.11 49.9536 108.021 49.1861 108.789C48.4186 109.557 47.5074 110.167 46.5045 110.583C45.5015 110.998 44.4265 111.213 43.3407 111.213C42.255 111.213 41.1798 111 40.1765 110.585C39.1733 110.17 38.2616 109.561 37.4936 108.794L2.42022 73.7201C0.870555 72.17 0 70.0678 0 67.8759C0 65.684 0.870555 63.5819 2.42022 62.0317L37.4936 26.9584C39.0437 25.4087 41.1459 24.5382 43.3378 24.5382C45.5297 24.5382 47.6318 25.4087 49.182 26.9584ZM128.422 38.6467C127.632 37.8842 127.002 36.9721 126.569 35.9636C126.136 34.9551 125.908 33.8704 125.898 32.7728C125.889 31.6752 126.098 30.5868 126.513 29.5709C126.929 28.555 127.543 27.6321 128.319 26.8559C129.095 26.0798 130.018 25.466 131.034 25.0504C132.05 24.6347 133.138 24.4256 134.236 24.4351C135.334 24.4447 136.418 24.6727 137.427 25.1059C138.435 25.5391 139.347 26.1689 140.11 26.9584L175.183 62.0317C176.733 63.5819 177.603 65.684 177.603 67.8759C177.603 70.0678 176.733 72.17 175.183 73.7201L140.11 108.794C138.559 110.344 136.456 111.214 134.263 111.213C132.07 111.212 129.967 110.34 128.417 108.789C126.867 107.238 125.997 105.135 125.998 102.942C125.999 100.749 126.87 98.6468 128.422 97.0968L157.642 67.8759L128.422 38.6467ZM932.758 130.727C935.22 133.151 938.174 134.363 941.621 134.363C943.856 134.363 945.901 133.814 947.758 132.716C949.651 131.579 951.167 130.064 952.303 128.17C953.477 126.276 954.083 124.174 954.121 121.863C954.083 118.454 952.814 115.538 950.314 113.113C947.852 110.689 944.955 109.477 941.621 109.477C938.174 109.477 935.22 110.689 932.758 113.113C930.295 115.538 929.083 118.454 929.121 121.863C929.083 125.348 930.295 128.303 932.758 130.727ZM910.116 68.9089L891.366 70.9543C890.835 69.0604 889.907 67.2801 888.581 65.6134C887.294 63.9468 885.551 62.6021 883.354 61.5793C881.157 60.5566 878.468 60.0453 875.286 60.0453C871.006 60.0453 867.407 60.9733 864.491 62.8293C861.612 64.6854 860.191 67.0907 860.229 70.0453C860.191 72.5831 861.119 74.6475 863.013 76.2384C864.945 77.8293 868.127 79.1362 872.559 80.1589L887.445 83.3407C895.703 85.121 901.839 87.943 905.854 91.8066C909.907 95.6702 911.953 100.727 911.991 106.977C911.953 112.469 910.343 117.318 907.161 121.523C904.017 125.689 899.642 128.947 894.036 131.295C888.43 133.644 881.991 134.818 874.718 134.818C864.036 134.818 855.438 132.583 848.922 128.113C842.407 123.606 838.525 117.337 837.275 109.307L857.331 107.375C858.241 111.314 860.172 114.288 863.127 116.295C866.081 118.303 869.926 119.307 874.661 119.307C879.547 119.307 883.468 118.303 886.422 116.295C889.415 114.288 890.911 111.807 890.911 108.852C890.911 106.352 889.945 104.288 888.013 102.659C886.119 101.03 883.165 99.7801 879.15 98.9089L864.263 95.7839C855.892 94.0415 849.699 91.1059 845.684 86.9771C841.669 82.8104 839.68 77.5452 839.718 71.1816C839.68 65.8028 841.138 61.1437 844.093 57.2043C847.085 53.2271 851.233 50.1589 856.536 47.9998C861.877 45.8028 868.032 44.7043 875.002 44.7043C885.229 44.7043 893.278 46.8824 899.15 51.2384C905.059 55.5945 908.714 61.4846 910.116 68.9089ZM770.613 103.778V133.114H750.044V16.75H770.613V80.8977H772.033L803.397 45.8409H827.431L793.596 83.5123L829.419 133.114H804.817L778.096 95.7569L770.613 103.778ZM686.607 133.114V45.8408H706.55V60.3863H707.459C709.05 55.3484 711.777 51.4658 715.641 48.7386C719.543 45.9734 723.993 44.5908 728.993 44.5908C730.13 44.5908 731.399 44.6476 732.8 44.7613C734.24 44.837 735.433 44.9696 736.38 45.159V64.0795C735.508 63.7764 734.126 63.5113 732.232 63.284C730.376 63.0188 728.577 62.8863 726.834 62.8863C723.084 62.8863 719.713 63.7007 716.721 65.3295C713.766 66.9204 711.436 69.1363 709.732 71.9772C708.027 74.8181 707.175 78.0946 707.175 81.8067V133.114H686.607ZM604.902 131.92C609.334 133.89 614.315 134.875 619.846 134.875C624.391 134.875 628.349 134.25 631.721 133C635.13 131.712 637.952 130.026 640.187 127.943C642.459 125.822 644.221 123.549 645.471 121.125H646.152V133.113H665.925V74.7043C665.925 68.9089 664.865 64.0793 662.743 60.2157C660.66 56.3521 657.895 53.3028 654.448 51.068C651.001 48.7952 647.194 47.1665 643.027 46.1816C638.861 45.1968 634.675 44.7043 630.471 44.7043C624.372 44.7043 618.804 45.6134 613.766 47.4316C608.728 49.2119 604.467 51.9013 600.982 55.4998C597.497 59.0604 594.997 63.4922 593.482 68.7953L612.687 71.5225C613.709 68.5301 615.679 65.9354 618.596 63.7384C621.55 61.5415 625.546 60.443 630.584 60.443C635.357 60.443 639.012 61.6172 641.55 63.9657C644.088 66.3142 645.357 69.6286 645.357 73.9089V74.2498C645.357 76.2195 644.618 77.6778 643.141 78.6248C641.702 79.5339 639.391 80.2157 636.209 80.6703C633.027 81.0869 628.88 81.5604 623.766 82.0907C619.524 82.5453 615.414 83.2839 611.437 84.3066C607.497 85.2915 603.956 86.7498 600.812 88.6816C597.668 90.6134 595.187 93.1892 593.368 96.4089C591.55 99.6286 590.641 103.701 590.641 108.625C590.641 114.344 591.91 119.155 594.448 123.057C597.024 126.958 600.509 129.913 604.902 131.92ZM635.925 117.318C632.895 118.947 629.315 119.761 625.187 119.761C620.906 119.761 617.384 118.795 614.618 116.863C611.853 114.932 610.471 112.072 610.471 108.284C610.471 105.632 611.171 103.473 612.573 101.807C613.974 100.102 615.887 98.7763 618.312 97.8293C620.736 96.8824 623.482 96.2006 626.55 95.7839C627.914 95.5945 629.524 95.3672 631.38 95.1021C633.236 94.8369 635.111 94.5339 637.005 94.193C638.899 93.8521 640.603 93.4543 642.118 92.9998C643.671 92.5453 644.77 92.0528 645.414 91.5225V101.807C645.414 105.026 644.581 108 642.914 110.727C641.285 113.454 638.956 115.651 635.925 117.318ZM450.641 16.75H476.437L510.982 101.068H512.346L546.891 16.75H572.687V133.114H552.459V53.1705H551.38L519.221 132.773H504.107L471.948 53H470.868V133.114H450.641V16.75ZM430.655 61.7498V45.8407H413.439V24.9316H392.871V45.8407H380.485V61.7498H392.871V110.273C392.833 115.727 394.008 120.273 396.394 123.909C398.818 127.545 402.095 130.235 406.224 131.977C410.352 133.682 414.992 134.458 420.144 134.307C423.061 134.231 425.523 133.966 427.53 133.511C429.576 133.057 431.148 132.64 432.246 132.261L428.78 116.182C428.212 116.333 427.379 116.504 426.28 116.693C425.22 116.882 424.045 116.977 422.758 116.977C421.053 116.977 419.5 116.712 418.099 116.182C416.697 115.651 415.561 114.666 414.689 113.227C413.856 111.75 413.439 109.629 413.439 106.863V61.7498H430.655ZM345.357 133.114V45.8409H365.925V133.114H345.357ZM355.698 33.4546C352.44 33.4546 349.637 32.375 347.289 30.2159C344.94 28.0189 343.766 25.3864 343.766 22.3182C343.766 19.2121 344.94 16.5795 347.289 14.4205C349.637 12.2235 352.44 11.125 355.698 11.125C358.993 11.125 361.796 12.2235 364.107 14.4205C366.456 16.5795 367.63 19.2121 367.63 22.3182C367.63 25.3864 366.456 28.0189 364.107 30.2159C361.796 32.375 358.993 33.4546 355.698 33.4546ZM294.05 45.6703C295.717 48.0945 297.024 50.8408 297.971 53.9089H319.448C318.577 48.1892 316.74 42.962 313.937 38.2271C311.133 33.4923 307.554 29.4014 303.198 25.9544C298.88 22.5074 293.937 19.8559 288.368 17.9998C282.8 16.1059 276.796 15.1589 270.357 15.1589C262.743 15.1589 255.698 16.5226 249.221 19.2498C242.743 21.9392 237.099 25.8786 232.289 31.068C227.478 36.2195 223.728 42.4885 221.039 49.8748C218.387 57.2612 217.062 65.6514 217.062 75.0453C217.062 87.318 219.315 97.9241 223.823 106.863C228.368 115.765 234.675 122.64 242.743 127.488C250.849 132.299 260.262 134.704 270.982 134.704C280.603 134.704 289.126 132.754 296.55 128.852C303.974 124.913 309.808 119.307 314.05 112.034C318.293 104.761 320.414 96.1438 320.414 86.1817V72.2044H273.198V88.6817H300.009C299.911 94.0176 298.739 98.6957 296.493 102.716C294.145 106.882 290.793 110.102 286.437 112.375C282.118 114.648 277.005 115.784 271.096 115.784C264.58 115.784 258.861 114.212 253.937 111.068C249.012 107.886 245.168 103.246 242.402 97.1476C239.637 91.0491 238.255 83.6059 238.255 74.818C238.255 66.1059 239.637 58.7195 242.402 52.6589C245.205 46.5604 249.05 41.9392 253.937 38.7953C258.823 35.6514 264.391 34.0794 270.641 34.0794C274.126 34.0794 277.346 34.5339 280.3 35.443C283.255 36.3142 285.868 37.6211 288.141 39.3635C290.452 41.1059 292.421 43.2082 294.05 45.6703Z"
            fill="#405DC5" />
        </svg>
      </div>
      <div className="LeftNav__navBar">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.dest}
            className={({ isActive }) =>
              isActive ? "LeftNav__link active" : "LeftNav__link"
            }
          >
            <div className="LeftNav__icon">
              <item.Icon />
            </div>{" "}
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="LeftNav__buttonWrapper">
        <Button
          href={`/app/classroom/select?org_id=${selectedClassroom?.org_id}`}
        >
          View all classrooms
        </Button>
      </div>
    </div>
  );
};

export default LeftNav;
