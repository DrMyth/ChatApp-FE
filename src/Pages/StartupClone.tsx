import { TopBar } from "../components/TopBar";
import { CopyIcon } from "./../icons/CopyIcon";

export const StartupClone = ({name, roomCode, generated}: {name: string, roomCode: string, generated: boolean}) => {
  return (
    <TopBar>
      <div>
        <div>
          <button
            onClick={()=>{}}
            className="bg-white/60 mb-2 w-full hover:bg-white/90 text-lg text-black/80 font-semibold py-2 px-4 rounded-md"
          >
            <div className="flex justify-center items-center gap-2">
                <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-[#464646] rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
                Loading...
            </div>
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            className="input-box w-full mt-2 mb-2"
            value={name}
            disabled
          />
          <div className="flex sm:flex-row flex-col sm:gap-2 gap-0.5">
            <input
              type="text"
              placeholder="Enter Room Code"
              className="input-box flex-1 mt-2 mb-2"
              value={roomCode}
              disabled
            />
            <button className="button mb-2 mt-2 bg-white hover:bg-white/90" onClick={()=>{}} disabled>
              Join Room
            </button>
          </div>
        </div>
        {generated == true ? (
          <div className="flex-col bg-[#262626] rounded-lg mt-2 mb-1 p-6">
            <div className="flex justify-center items-center text-center mr-3 ml-3">
              <div className="text-secondary m-1">Share this code with your friend</div>
            </div>
            <div className="mt-1 flex gap-2 justify-center items-center font-bold text-2xl">
                {roomCode}
                <div className="cursor-pointer" onClick={()=>{}}> 
                <CopyIcon />
                </div>
              </div>
          </div>
        ) : null}
      </div>
    </TopBar>
  );
};
