/* eslint-disable react/no-unknown-property */
import svg from "../../assets/group3.svg";
import codecell from "../../assets/codecell.png";

const Logogrid = () => {
  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex justify-center items-center flex-col">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-semibold sm:text-2xl">
            TRUSTED BY TEAMS FROM AROUND THE WORLD
          </h3>
          <p className=" mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            dignissim nibh nisl, vel egestas magna rhoncus at. Nunc elementum
            efficitur tortor in laoreet.
          </p>
        </div>
        <div className="mt-12  flex justify-center items-center">
          <ul className="inline-grid grid-cols-3 gap-x-10 gap-y-6 md:gap-x-16 md:grid-cols-3 lg:grid-cols-3">
            <li className="flex justify-center items-center">
              <img className="w-16 sm:w-20 object-fill" src="https://tseccodestorm.dev/images/logo.png" />
            </li>
            <li className="flex justify-center items-center object-fill">
              <img className="w-[72px] sm:w-24 object-fill" src={codecell} />
            </li>
            <li className="flex justify-center items-center">
              <img src={svg} className="w-16 sm:w-20 object-fill" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Logogrid;
